import { useState } from 'react'

import type { LunaticError, LunaticState } from '@inseefr/lunatic'

import type { TelemetryParadata } from '@/models/telemetry'
import { computeControlEvent, computeControlSkipEvent } from '@/utils/telemetry'

import { useStromaeNavigation } from '../useStromaeNavigation'
import { ErrorType, computeErrorType, isSameErrors } from './utils'

type useControlsProps = {
  compileControls: LunaticState['compileControls']
  goNextPage: () => Promise<void>
  goPreviousPage: () => void
  goToPage: (
    page: Parameters<ReturnType<typeof useStromaeNavigation>['goToPage']>[0],
  ) => void
  isTelemetryInitialized?: boolean
  pushEvent: (e: TelemetryParadata) => void | Promise<boolean>
}

/**
 * On navigation, compute controls from filled inputs.
 *
 * It will return what is necessary to display the errors and block the user if
 * the error is blocking.
 */
export function useControls({
  isTelemetryInitialized = false,
  pushEvent,
  compileControls,
  goNextPage,
  goPreviousPage,
  goToPage,
}: Readonly<useControlsProps>) {
  const [activeErrors, setActiveErrors] = useState<
    Record<string, LunaticError[]> | undefined
  >(undefined)
  const [isWarningAcknowledged, setIsWarningAcknowledged] =
    useState<boolean>(false)

  const handleNextPage = (isOnLunaticPage: boolean) => {
    if (!isOnLunaticPage) return goNextPage()

    const { currentErrors } = compileControls()

    const errorType = computeErrorType(currentErrors)
    switch (errorType) {
      case ErrorType.BLOCKING:
        // If error is blocking we prevent further navigation no matter what
        if (isTelemetryInitialized) {
          pushEvent(
            computeControlEvent({
              controlIds: Object.keys(currentErrors!),
            }),
          )
        }
        setActiveErrors(currentErrors)
        return
      case ErrorType.WARNING:
        // If error is warning we prevent further navigation if the user did not
        // see this error before ; if the user wants to pursue anyway (i.e. the
        // same error is triggered twice), user can proceed
        if (
          isWarningAcknowledged &&
          currentErrors &&
          activeErrors &&
          isSameErrors(currentErrors, activeErrors)
        ) {
          if (isTelemetryInitialized) {
            pushEvent(
              computeControlSkipEvent({
                controlIds: Object.keys(currentErrors),
              }),
            )
          }
          resetControls()
          goNextPage()
          return
        }
        if (isTelemetryInitialized) {
          pushEvent(
            computeControlEvent({
              controlIds: Object.keys(currentErrors!),
            }),
          )
        }
        setIsWarningAcknowledged(true)
        setActiveErrors(currentErrors)
        return
      default:
        resetControls()
        goNextPage()
    }
  }

  const handlePreviousPage = () => {
    resetControls()
    goPreviousPage()
  }

  const handleGoToPage = (
    page: Parameters<ReturnType<typeof useStromaeNavigation>['goToPage']>[0],
  ) => {
    resetControls()
    goToPage(page)
  }

  const resetControls = () => {
    setActiveErrors(undefined)
    setIsWarningAcknowledged(false)
  }

  const obsoleteControls = () => {
    setIsWarningAcknowledged(false)
  }

  return {
    /** Errors to be displayed by Lunatic components (sorted by criticality). */
    activeErrors,
    /** Go to page handler which reset controls (e.g. active errors). */
    handleGoToPage,
    /** Go to next page handler which check controls shenanigans. */
    handleNextPage,
    /** Go to previous page handler which reset controls (e.g. active errors). */
    handlePreviousPage,
    /**
     * Allow to manually set acknowledgement as obsolete (e.g. when the input is
     * changed) so that new controls can trigger the same warning again but do
     * not erase the displayed errors.
     */
    obsoleteControls,
    /** Allow to manually reset controls (e.g. when we go to another page). */
    resetControls,
  }
}
