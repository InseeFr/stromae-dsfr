import { useState } from 'react'

import type { LunaticError, LunaticState } from '@inseefr/lunatic'

import type {
  LunaticGoNextPage,
  LunaticGoPreviousPage,
  LunaticGoToPage,
} from '@/models/lunaticType'
import type { TelemetryParadata } from '@/models/telemetry'
import { computeControlEvent, computeControlSkipEvent } from '@/utils/telemetry'

import { ErrorType, computeErrorType, isSameErrors } from './utils'

type useControlsProps = {
  compileControls: LunaticState['compileControls']
  goNextPage: LunaticGoNextPage
  goPreviousPage: LunaticGoPreviousPage
  goToPage: LunaticGoToPage
  isTelemetryInitialized?: boolean
  pushEvent: (e: TelemetryParadata) => void | Promise<boolean>
}

/**
 * On navigation in a Lunatic page, compute controls from filled inputs.
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
  const [isBlocking, setIsBlocking] = useState<boolean>(false)
  const [isWarningAcknowledged, setIsWarningAcknowledged] =
    useState<boolean>(false)

  const handleNextLunaticPage = () => {
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
        setIsBlocking(true)
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

  const handlePreviousLunaticPage = () => {
    resetControls()
    goPreviousPage()
  }

  const handleGoToLunaticPage = (page: Parameters<LunaticGoToPage>[0]) => {
    resetControls()
    goToPage(page)
  }

  const resetControls = () => {
    setActiveErrors(undefined)
    setIsWarningAcknowledged(false)
    setIsBlocking(false)
  }

  return {
    /** Errors to be displayed by Lunatic components (sorted by criticality). */
    activeErrors,
    /** Go to page handler which reset controls (e.g. active errors). */
    handleGoToLunaticPage,
    /** Go to next page handler which check controls shenanigans. */
    handleNextLunaticPage,
    /** Go to previous page handler which reset controls (e.g. active errors). */
    handlePreviousLunaticPage,
    /**
     * Whether or not the respondent should be blocked from further navigation
     * until the filled input is changed. Should be used to set navigation
     * buttons as disabled.
     */
    isBlocking,
    /** Allow to manually reset controls (e.g. when the input is changed). */
    resetControls,
  }
}
