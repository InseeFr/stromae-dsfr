import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import {
  type LunaticChangesHandler,
  LunaticComponents,
  type LunaticData,
  type LunaticSource,
  useLunatic,
} from '@inseefr/lunatic'
import { useNavigate } from '@tanstack/react-router'

import { MODE_TYPE } from '@/constants/mode'
import { PAGE_TYPE } from '@/constants/page'
import { useTelemetry } from '@/contexts/TelemetryContext'
import { useAddPreLogoutAction } from '@/hooks/prelogout'
import { useBeforeUnload } from '@/hooks/useBeforeUnload'
import { usePrevious } from '@/hooks/usePrevious'
import type { Metadata } from '@/models/Metadata'
import type { StateData } from '@/models/StateData'
import type { SurveyUnitData } from '@/models/SurveyUnitData'
import type {
  LunaticGetReferentiel,
  LunaticPageTag,
} from '@/models/lunaticType'
import {
  computeInitEvent,
  computeInputEvent,
  computeNewPageEvent,
} from '@/utils/telemetry'

import { dismissAllToasts } from '../Toast'
import { SurveyContainer } from './SurveyContainer'
import { EndPage } from './customPages/EndPage'
import { ValidationModal } from './customPages/ValidationModal'
import { ValidationPage } from './customPages/ValidationPage'
import { WelcomeModal } from './customPages/WelcomeModal'
import { WelcomePage } from './customPages/WelcomePage'
import { useControls } from './hooks/useControls'
import { usePushEventAfterInactivity } from './hooks/usePushEventAfterInactivity'
import { useRefSync } from './hooks/useRefSync'
import { useStromaeNavigation } from './hooks/useStromaeNavigation'
import { useUpdateEffect } from './hooks/useUpdateEffect'
import './orchestrator.css'
import { slotComponents } from './slotComponents'
import { computeLunaticComponents } from './utils/components'
import { trimCollectedData } from './utils/data'
import { downloadAsJson } from './utils/downloadAsJson'
import { isObjectEmpty } from './utils/isObjectEmpty'
import { hasBeenSent, shouldDisplayWelcomeModal } from './utils/orchestrator'
import { scrollAndFocusToFirstError } from './utils/scrollAndFocusToFirstError'
import { isSequencePage } from './utils/sequence'
import { VTLDevTools } from './vtlDevTools/VTLDevtools'
import { createLunaticLogger } from './vtlDevTools/VTLErrorStore'

export type OrchestratorProps = OrchestratorProps.Common &
  (
    | OrchestratorProps.Visualize
    | OrchestratorProps.Collect
    | OrchestratorProps.Review
  )

export namespace OrchestratorProps {
  export type Common = {
    /** Questionnaire data consumed by Lunatic to make its components */
    source: LunaticSource
    /** Initial survey unit data when we initialize the orchestrator */
    surveyUnitData: SurveyUnitData | undefined
    /** Allows to fetch nomenclature by id */
    getReferentiel: LunaticGetReferentiel
    /** Survey unit metadata */
    metadata: Metadata
  }

  export type Visualize = {
    mode: MODE_TYPE.VISUALIZE
  }

  export type Review = {
    mode: MODE_TYPE.REVIEW
  }

  export type Collect = {
    mode: MODE_TYPE.COLLECT
    /** Updates data with the modified data and survey state */
    updateDataAndStateData: (params: {
      stateData: StateData
      data: LunaticData['COLLECTED']
      onSuccess?: () => void
      isLogout: boolean
    }) => Promise<void>
    /** Allows user to download a deposit proof PDF */
    getDepositProof: () => Promise<void>
  }
}

export function Orchestrator(props: OrchestratorProps) {
  const { source, surveyUnitData, getReferentiel, mode, metadata } = props

  const navigate = useNavigate()

  // Display a modal to warn the user their change might not be sent
  const [isDirtyState, setIsDirtyState] = useState<boolean>(false)
  useBeforeUnload(isDirtyState)

  // Allow to send telemetry events once survey unit id has been set
  const [isTelemetryInitialized, setIsTelemetryInitialized] =
    useState<boolean>(false)
  const {
    isTelemetryDisabled,
    pushEvent,
    setDefaultValues,
    triggerBatchTelemetryCallback,
  } = useTelemetry()
  const { setEventToPushAfterInactivity, triggerInactivityTimeoutEvent } =
    usePushEventAfterInactivity(pushEvent)

  /** Triggers telemetry input event on Lunatic change */
  const handleLunaticChange: LunaticChangesHandler = useCallback(
    (changes) => {
      if (changes.length === 1) {
        // could be a text input, we only send the event once user has stopped
        // actively typing since Lunatic triggers its onChange on every input
        const { name, iteration } = changes[0]
        setEventToPushAfterInactivity(
          computeInputEvent({
            name: name,
            iteration: iteration,
          }),
        )
      } else {
        for (const { name, iteration } of changes) {
          // weird inputs, probably not text input, push everything
          pushEvent(
            computeInputEvent({
              name: name,
              iteration: iteration,
            }),
          )
        }
      }
    },
    [pushEvent, setEventToPushAfterInactivity],
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const pageTagRef = useRef<LunaticPageTag>('1')
  const validationModalActionsRef = useRef({
    open: () => Promise.resolve(),
  })

  const initialCurrentPage = surveyUnitData?.stateData?.currentPage
  const initialState = surveyUnitData?.stateData?.state
  const pagination = source.pagination ?? 'question'

  const lunaticLogger = useMemo(
    () =>
      mode === MODE_TYPE.VISUALIZE
        ? createLunaticLogger({ pageTag: pageTagRef })
        : undefined,
    [mode],
  )

  const {
    getComponents,
    Provider: LunaticProvider,
    compileControls,
    goPreviousPage: goPreviousLunaticPage,
    goNextPage: goNextLunaticPage,
    getData,
    isFirstPage,
    isLastPage,
    pageTag,
    goToPage: goToLunaticPage,
    getChangedData,
    resetChangedData,
    overview,
  } = useLunatic(source, surveyUnitData?.data, {
    logger: lunaticLogger,
    activeControls: true,
    getReferentiel,
    autoSuggesterLoading: true,
    onChange: (e) => {
      setIsDirtyState(true)
      acknowledgeControls()
      if (isTelemetryInitialized) handleLunaticChange(e)
    },
    trackChanges: mode === MODE_TYPE.COLLECT,
    withOverview: true,
  })

  pageTagRef.current = pageTag

  // current date to show in end page on validation
  const [lastUpdateDate, setLastUpdateDate] = useState<number | undefined>(
    surveyUnitData?.stateData?.date,
  )

  const { currentPage, goNext, goToPage, goPrevious } = useStromaeNavigation({
    goNextLunatic: goNextLunaticPage,
    goPrevLunatic: goPreviousLunaticPage,
    goToLunaticPage: goToLunaticPage,
    isFirstPage,
    isLastPage,
    initialCurrentPage,
    openValidationModal: () => validationModalActionsRef.current.open(),
  })

  const {
    acknowledgeControls,
    activeErrors,
    handleGoToPage,
    handleNextPage,
    handlePreviousPage,
    resetControls,
  } = useControls({
    compileControls,
    pushEvent,
    isTelemetryInitialized,
    goNextPage: goNext,
    goPreviousPage: goPrevious,
    goToPage: goToPage,
  })

  const previousPage = usePrevious(currentPage) ?? initialCurrentPage
  const previousPageTag = usePrevious(pageTag) ?? initialCurrentPage

  const getCurrentStateData = useRefSync((): StateData => {
    switch (currentPage) {
      case PAGE_TYPE.END:
        return { date: Date.now(), currentPage, state: 'VALIDATED' }
      case PAGE_TYPE.LUNATIC:
        return { date: Date.now(), currentPage: pageTag, state: 'INIT' }
      case PAGE_TYPE.VALIDATION:
      case PAGE_TYPE.WELCOME:
      default:
        return { date: Date.now(), currentPage, state: 'INIT' }
    }
  })

  /** Allows to download data for visualize  */
  const downloadAsJsonRef = useRefSync(() => {
    const data = getData(false)
    const trimmedCollectedData = trimCollectedData(data.COLLECTED)
    const trimmedData = {
      ...data,
      COLLECTED: trimmedCollectedData,
    }

    downloadAsJson<SurveyUnitData>({
      dataToDownload: {
        data: trimmedData,
        stateData: getCurrentStateData.current(),
        personalization: surveyUnitData?.personalization,
      },
      //The label of source is not dynamic
      filename: `${source.label?.value}-${new Date().toLocaleDateString()}`,
    })
  })

  const triggerDataAndStateUpdate = (isLogout: boolean = false) => {
    if (mode === MODE_TYPE.COLLECT && !hasBeenSent(initialState)) {
      const stateData = getCurrentStateData.current()
      const data = getChangedData()

      // check if any data has been updated
      const isCollectedDataEmpty = isObjectEmpty(data.COLLECTED ?? {})
      if (
        isCollectedDataEmpty &&
        (currentPage === PAGE_TYPE.LUNATIC
          ? previousPage === PAGE_TYPE.LUNATIC && previousPageTag === pageTag
          : stateData.currentPage === previousPage)
      ) {
        // no change, no need to push anything
        setIsDirtyState(false)
        return
      }

      const collectedData = isCollectedDataEmpty
        ? undefined
        : trimCollectedData(data.COLLECTED)

      props.updateDataAndStateData({
        stateData,
        data: collectedData,
        onSuccess: resetChangedData,
        isLogout: isLogout,
      })
      setIsDirtyState(false)
      // update date to show on end page message
      setLastUpdateDate(stateData.date)
    }
  }

  // Telemetry initialization
  useEffect(() => {
    if (!isTelemetryDisabled && mode === MODE_TYPE.COLLECT) {
      setDefaultValues({ idSU: surveyUnitData?.id })
      setIsTelemetryInitialized(true)
    }
  }, [isTelemetryDisabled, mode, setDefaultValues, surveyUnitData?.id])

  // Initialization
  useEffect(() => {
    if (isTelemetryInitialized) {
      pushEvent(computeInitEvent())
    }
  }, [isTelemetryInitialized, pushEvent])

  useEffect(() => {
    if (activeErrors) {
      scrollAndFocusToFirstError()
    }
  }, [activeErrors])

  useAddPreLogoutAction(async () => {
    if (isTelemetryInitialized) {
      triggerInactivityTimeoutEvent()
    }
    triggerDataAndStateUpdate(true)
    dismissAllToasts()
  })

  // On page change
  useUpdateEffect(() => {
    if (isTelemetryInitialized) {
      triggerInactivityTimeoutEvent()
      pushEvent(
        computeNewPageEvent({
          page: currentPage,
          pageTag,
        }),
      )
      if (currentPage === PAGE_TYPE.END) {
        if (triggerBatchTelemetryCallback) {
          triggerBatchTelemetryCallback()
        }
      }
    }

    //Reset scroll to the container when the top is not visible
    if (
      containerRef.current &&
      containerRef.current.getBoundingClientRect().y < 0
    ) {
      containerRef.current.scrollIntoView(true)
    }
    //Reset the focus inside content so the next "Tab" will focus inside content
    if (contentRef.current) {
      contentRef.current.setAttribute('tabindex', '-1')
      contentRef.current.focus({
        preventScroll: true,
      })
      contentRef.current.removeAttribute('tabindex')
    }
    resetControls()
    // Persist data and stateData when page change in "collect" mode
    triggerDataAndStateUpdate()
  }, [currentPage, pageTag])

  // Persist data when component unmount (ie when navigate etc...)
  useEffect(() => {
    return () => {
      if (isTelemetryInitialized) {
        triggerInactivityTimeoutEvent()
        if (triggerBatchTelemetryCallback) {
          ;(async () => {
            await triggerBatchTelemetryCallback()
          })()
        }
      }
      triggerDataAndStateUpdate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { components, bottomComponents } = computeLunaticComponents(
    getComponents(),
    pagination,
  )

  const handleDepositProofClick = async () => {
    if (mode === MODE_TYPE.VISUALIZE) {
      downloadAsJsonRef.current()
      navigate({ to: '/visualize', params: {} })
      return
    }
    if (mode === MODE_TYPE.COLLECT) {
      props.getDepositProof()
      return
    }
  }

  return (
    <div ref={containerRef}>
      <LunaticProvider>
        <SurveyContainer
          handleNextClick={() =>
            handleNextPage(currentPage === PAGE_TYPE.LUNATIC)
          }
          handlePreviousClick={handlePreviousPage}
          handleDownloadData={downloadAsJsonRef.current} // Visualize
          currentPage={currentPage}
          mode={mode}
          handleDepositProofClick={handleDepositProofClick}
          pagination={pagination}
          overview={overview}
          isDirtyState={isDirtyState}
          isSequencePage={isSequencePage(components)}
          bottomContent={
            bottomComponents.length > 0 && (
              <div className={fr.cx('fr-my-10v')}>
                {currentPage === PAGE_TYPE.LUNATIC && (
                  <LunaticComponents
                    components={bottomComponents}
                    slots={slotComponents}
                    componentProps={() => ({
                      errors: activeErrors,
                    })}
                  />
                )}
              </div>
            )
          }
        >
          <div ref={contentRef} className={fr.cx('fr-mb-4v')}>
            {currentPage === PAGE_TYPE.WELCOME && (
              <WelcomePage metadata={metadata} />
            )}
            {currentPage === PAGE_TYPE.LUNATIC && (
              <LunaticComponents
                components={components}
                slots={slotComponents}
                componentProps={() => ({
                  errors: activeErrors,
                })}
              />
            )}
            {currentPage === PAGE_TYPE.VALIDATION && <ValidationPage />}
            {currentPage === PAGE_TYPE.END && (
              <EndPage state={initialState} date={lastUpdateDate} />
            )}
            <WelcomeModal
              goBack={() =>
                initialCurrentPage
                  ? handleGoToPage({ page: initialCurrentPage })
                  : null
              }
              open={shouldDisplayWelcomeModal(initialState, initialCurrentPage)}
            />
            <ValidationModal actionsRef={validationModalActionsRef} />
            {mode === MODE_TYPE.VISUALIZE && <VTLDevTools />}
          </div>
        </SurveyContainer>
      </LunaticProvider>
    </div>
  )
}
