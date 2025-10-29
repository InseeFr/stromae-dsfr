import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import {
  type LunaticChangesHandler,
  LunaticComponents,
  type LunaticData,
  type LunaticSource,
  getArticulationState,
  useLunatic,
} from '@inseefr/lunatic'
import { useNavigate } from '@tanstack/react-router'
import { assert } from 'tsafe/assert'

import { MODE_TYPE } from '@/constants/mode'
import { PAGE_TYPE } from '@/constants/page'
import { useTelemetry } from '@/contexts/TelemetryContext'
import { useAddPreLogoutAction } from '@/hooks/prelogout'
import { useBeforeUnload } from '@/hooks/useBeforeUnload'
import { usePrevious } from '@/hooks/usePrevious'
import type { Interrogation } from '@/models/interrogation'
import type { InterrogationData } from '@/models/interrogationData'
import type {
  LunaticGetReferentiel,
  LunaticPageTag,
} from '@/models/lunaticType'
import type { Metadata } from '@/models/metadata'
import type { StateData } from '@/models/stateData'
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
import { useInterrogation } from './hooks/interrogation/useInterrogation'
import { hasDataChanged } from './hooks/interrogation/utils'
import { useControls } from './hooks/useControls'
import { useEvents } from './hooks/useEvents'
import { usePushEventAfterInactivity } from './hooks/usePushEventAfterInactivity'
import { useRefSync } from './hooks/useRefSync'
import { useStromaeNavigation } from './hooks/useStromaeNavigation'
import { useUpdateEffect } from './hooks/useUpdateEffect'
import './orchestrator.css'
import { slotComponents } from './slotComponents'
import { articulationToCsv } from './utils/articulationToCsv'
import { computeLunaticComponents } from './utils/components'
import { computeInterrogation, trimCollectedData } from './utils/data'
import { downloadAsCsv, downloadAsJson } from './utils/downloadFile'
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
    /** Initial interrogation when we initialize the orchestrator */
    initialInterrogation?: Interrogation
    /** Allows to fetch nomenclature by id */
    getReferentiel: LunaticGetReferentiel
    /** Interrogation metadata */
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
  const { source, getReferentiel, mode, metadata } = props

  const navigate = useNavigate()

  const initialInterrogation = computeInterrogation(props.initialInterrogation)

  // Display a modal to warn the user their change might not be sent
  const [isDirtyState, setIsDirtyState] = useState<boolean>(false)
  useBeforeUnload(isDirtyState)

  // Allow to send telemetry events once interrogation id has been set
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

  const initialCurrentPage = initialInterrogation?.stateData?.currentPage
  const initialState = initialInterrogation?.stateData?.state
  const pagination = source.pagination ?? 'question'
  const hasArticulation = source.articulation !== undefined

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
    isFirstPage,
    isLastPage,
    pageTag,
    goToPage: goToLunaticPage,
    getChangedData,
    getData,
    resetChangedData,
    overview,
    getMultimode,
  } = useLunatic(source, initialInterrogation?.data, {
    logger: lunaticLogger,
    activeControls: true,
    getReferentiel,
    autoSuggesterLoading: true,
    onChange: (e) => {
      setIsDirtyState(true)
      obsoleteControls()
      if (isTelemetryInitialized) handleLunaticChange(e)
    },
    trackChanges: true,
    withOverview: true,
  })

  pageTagRef.current = pageTag

  // current date to show in end page on validation
  const [lastUpdateDate, setLastUpdateDate] = useState<number | undefined>(
    initialInterrogation?.stateData?.date,
  )

  const getCurrentArticulationState = () => {
    // @ts-expect-error source has articulation
    return getArticulationState(source, getData(false))
  }

  const { interrogation, updateInterrogation } = useInterrogation(
    initialInterrogation,
    {
      getArticulationState: () => {
        if (!hasArticulation) {
          return { items: [] }
        }
        return getCurrentArticulationState()
      },
      getMultimode: getMultimode,
    },
  )
  useEvents(interrogation, getCurrentArticulationState, pageTag, getChangedData)

  /** For validating the questionnaire, it tries to put a `VALIDATED` stateData with the `endPage` */
  const validateQuestionnaire = async () => {
    if (mode === MODE_TYPE.COLLECT) {
      assert(interrogation.stateData !== undefined)

      return await props.updateDataAndStateData({
        stateData: {
          ...interrogation.stateData,
          state: 'VALIDATED',
          date: new Date().getTime(),
          currentPage: PAGE_TYPE.END,
        },
        // there is no new data to send on validation page
        data: {},
        isLogout: false,
      })
    }

    return Promise.resolve()
  }

  const { currentPageType, goNext, goToPage, goPrevious } =
    useStromaeNavigation({
      goNextLunatic: goNextLunaticPage,
      goPrevLunatic: goPreviousLunaticPage,
      goToLunaticPage: goToLunaticPage,
      isFirstPage,
      isLastPage,
      initialCurrentPage,
      openValidationModal: () => validationModalActionsRef.current.open(),
      validateQuestionnaire,
    })

  const {
    activeErrors,
    handleGoToPage,
    handleNextPage,
    handlePreviousPage,
    obsoleteControls,
    resetControls,
  } = useControls({
    compileControls,
    pushEvent,
    isTelemetryInitialized,
    goNextPage: goNext,
    goPreviousPage: goPrevious,
    goToPage: goToPage,
  })

  const currentPage =
    currentPageType === PAGE_TYPE.LUNATIC ? pageTag : currentPageType

  const previousPage = usePrevious(currentPageType) ?? initialCurrentPage
  const previousPageTag = usePrevious(pageTag) ?? initialCurrentPage

  /** Allows to download data for visualize  */
  const downloadAsJsonRef = useRefSync(() => {
    const interrogation = updateInterrogation(
      getData(true) as InterrogationData,
      currentPage,
    )

    downloadAsJson<Interrogation>({
      dataToDownload: interrogation,
      //The label of source is not dynamic
      filename: `${source.label?.value}-${new Date().toLocaleDateString()}`,
    })
  })

  /** Allows to download articulation for visualize  */
  const downloadArticulationRef = useRefSync(() => {
    if (!hasArticulation) {
      console.warn('No articulation available, skipping CSV download.')
      return
    }

    // @ts-expect-error source has articulation
    const articulationState = getArticulationState(source, getData(false))

    downloadAsCsv({
      dataToDownload: articulationToCsv(articulationState.items),
      //The label of source is not dynamic
      filename: `${source.label?.value}-articulation-${new Date().toLocaleDateString()}`,
    })
  })

  const triggerDataAndStateUpdate = (isLogout: boolean = false) => {
    if (mode === MODE_TYPE.COLLECT && !hasBeenSent(initialState)) {
      const changedData = getChangedData(true) as InterrogationData
      const interrogation = updateInterrogation(changedData, currentPage)

      if (
        !interrogation.stateData ||
        (!hasDataChanged(changedData) &&
          (currentPageType === PAGE_TYPE.LUNATIC
            ? previousPage === PAGE_TYPE.LUNATIC && previousPageTag === pageTag
            : currentPage === previousPage))
      ) {
        // no change and we are still on the same page, no need to push anything
        setIsDirtyState(false)
        return
      }

      props.updateDataAndStateData({
        stateData: interrogation.stateData,
        // we push only the new data, not the full data
        // changedData.COLLECTED is defined since hasDataChanged checks it
        data: trimCollectedData(changedData.COLLECTED!),
        onSuccess: resetChangedData,
        isLogout: isLogout,
      })
      setIsDirtyState(false)
      // update date to show on end page message
      setLastUpdateDate(interrogation.stateData?.date)
    }
  }

  // Telemetry initialization
  useEffect(() => {
    if (!isTelemetryDisabled && mode === MODE_TYPE.COLLECT) {
      setDefaultValues({ idInterrogation: initialInterrogation?.id })
      setIsTelemetryInitialized(true)
    }
  }, [isTelemetryDisabled, mode, setDefaultValues, initialInterrogation?.id])

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
          page: currentPageType,
          pageTag,
        }),
      )
      if (currentPageType === PAGE_TYPE.END) {
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
    // Persist data and stateData when page change in "collect" mode,
    // except on end page since it's handled during questionnaire validation
    if (currentPageType !== PAGE_TYPE.END) {
      triggerDataAndStateUpdate()
    }
  }, [currentPageType, pageTag])

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
            handleNextPage(currentPageType === PAGE_TYPE.LUNATIC)
          }
          handlePreviousClick={handlePreviousPage}
          handleDownloadData={downloadAsJsonRef.current} // Visualize
          handleDownloadArticulation={downloadArticulationRef.current} // Visualize
          currentPage={currentPageType}
          mode={mode}
          handleDepositProofClick={handleDepositProofClick}
          pagination={pagination}
          overview={overview}
          hasArticulation={hasArticulation}
          isDirtyState={isDirtyState}
          isSequencePage={isSequencePage(components)}
          bottomContent={
            bottomComponents.length > 0 && (
              <div className={fr.cx('fr-my-10v')}>
                {currentPageType === PAGE_TYPE.LUNATIC && (
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
            {currentPageType === PAGE_TYPE.WELCOME && (
              <WelcomePage metadata={metadata} />
            )}
            {currentPageType === PAGE_TYPE.LUNATIC && (
              <LunaticComponents
                components={components}
                slots={slotComponents}
                componentProps={() => ({
                  errors: activeErrors,
                })}
              />
            )}
            {currentPageType === PAGE_TYPE.VALIDATION && <ValidationPage />}
            {currentPageType === PAGE_TYPE.END && (
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
