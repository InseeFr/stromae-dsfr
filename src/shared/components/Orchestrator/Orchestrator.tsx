import { MODE_TYPE } from '@/consts/mode'
import { PAGE_TYPE } from '@/consts/page'
import { useTelemetry } from '@/contexts/TelemetryContext'
import type { Metadata } from '@/model/Metadata'
import type { StateData } from '@/model/StateData'
import type { SurveyUnitData } from '@/model/SurveyUnitData'
import { useAddPreLogoutAction } from '@/shared/hooks/prelogout'
import { downloadAsJson } from '@/utils/downloadAsJson'
import { isObjectEmpty } from '@/utils/isObjectEmpty'
import { hasBeenSent, shouldDisplayWelcomeModal } from '@/utils/orchestrator'
import {
  computeClickEvent,
  computeInitEvent,
  computeNewPageEvent,
} from '@/utils/telemetry'
import { useRefSync } from '@/utils/useRefSync'
import { useUpdateEffect } from '@/utils/useUpdateEffect'
import { fr } from '@codegouvfr/react-dsfr'
import {
  LunaticComponents,
  useLunatic,
  type LunaticData,
  type LunaticError,
  type LunaticSource,
} from '@inseefr/lunatic'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { EndPage } from './CustomPages/EndPage'
import { ValidationModal } from './CustomPages/ValidationModal'
import { ValidationPage } from './CustomPages/ValidationPage'
import { WelcomeModal } from './CustomPages/WelcomeModal'
import { WelcomePage } from './CustomPages/WelcomePage'
import { SurveyContainer } from './SurveyContainer'
import { VTLDevTools } from './VTLDevTools/VTLDevtools'
import { createLunaticLogger } from './VTLDevTools/VTLErrorStore'
import { slotComponents } from './slotComponents'
import { useStromaeNavigation } from './useStromaeNavigation'
import { isBlockingError, isSameErrors } from './utils/controls'
import type {
  LunaticComponentsProps,
  LunaticGetReferentiel,
  LunaticPageTag,
} from './utils/lunaticType'
import { scrollAndFocusToFirstError } from './utils/scrollAndFocusToFirstError'
import { isSequencePage } from './utils/sequence'

/**
 * Module augmentation to specify that Lunatic Component can have an additional props position
 */
declare module '@inseefr/lunatic' {
  interface LunaticExtraProps {
    position: 'bottom' | undefined
  }
}

export type OrchestratorProps = OrchestratorProps.Common &
  (
    | OrchestratorProps.Visualize
    | OrchestratorProps.Collect
    | OrchestratorProps.Review
  )

export namespace OrchestratorProps {
  export type Common = {
    source: LunaticSource
    surveyUnitData: SurveyUnitData | undefined
    getReferentiel: LunaticGetReferentiel
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
    updateDataAndStateData: (params: {
      stateData: StateData
      data: LunaticData['COLLECTED']
      onSuccess?: () => void
    }) => Promise<void>
    getDepositProof: () => Promise<void>
  }
}

export function Orchestrator(props: OrchestratorProps) {
  const { source, surveyUnitData, getReferentiel, mode, metadata } = props
  const { pushEvent } = useTelemetry()

  const initialCurrentPage = surveyUnitData?.stateData?.currentPage
  const initialState = surveyUnitData?.stateData?.state
  const pagination = source.pagination ?? 'question'

  // Displays the welcome modal which allows to come back to current page
  const shouldWelcome = shouldDisplayWelcomeModal(
    initialState,
    initialCurrentPage
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const pageTagRef = useRef<LunaticPageTag>('1')
  const validationModalActionsRef = useRef({
    open: () => Promise.resolve(),
  })

  const lunaticLogger = useMemo(
    () =>
      mode === MODE_TYPE.VISUALIZE
        ? createLunaticLogger({ pageTag: pageTagRef })
        : undefined,
    [mode]
  )

  const {
    getComponents,
    Provider: LunaticProvider,
    compileControls,
    goPreviousPage: goPrevLunatic,
    goNextPage: goNextLunatic,
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
    trackChanges: mode === MODE_TYPE.COLLECT,
    withOverview: true,
  })

  pageTagRef.current = pageTag

  const [activeErrors, setActiveErrors] = useState<
    Record<string, LunaticError[]> | undefined
  >(undefined)

  // Decorates goNext function with controls behavior
  const goNextWithControls = (goNext: () => void) => {
    const { currentErrors } = compileControls()

    // No errors, continue
    if (!currentErrors) {
      setActiveErrors(undefined)
      goNext()
      return
    }

    // An error is blocking, we stay on the page
    if (isBlockingError(currentErrors)) {
      //compileControls returns isCritical but I prefer define my own rules of blocking error in the orchestrator
      setActiveErrors(currentErrors)
      return
    }

    // activeErrors and currentErrors are the same and no blocking error, we go next
    if (isSameErrors(currentErrors, activeErrors)) {
      setActiveErrors(undefined)
      goNext()
      return
    }
    setActiveErrors(currentErrors)
  }

  const { currentPage, goNext, goToPage, goPrevious } = useStromaeNavigation({
    goNextWithControls,
    goNextLunatic,
    goPrevLunatic,
    isFirstPage,
    isLastPage,
    goToLunaticPage,
    initialCurrentPage,
    openValidationModal: () => validationModalActionsRef.current.open(),
  })

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

  // Allow to download data for visualize
  const downloadAsJsonRef = useRefSync(() => {
    downloadAsJson<SurveyUnitData>({
      dataToDownload: {
        data: getData(false),
        stateData: getCurrentStateData.current(),
        personalization: surveyUnitData?.personalization,
      },
      //The label of source is not dynamic
      filename: `${source.label?.value}-${new Date().toLocaleDateString()}`,
    })
  })

  /* initialization */
  useEffect(() => {
    pushEvent(computeInitEvent({ idSU: surveyUnitData?.id ?? '' }))
  }, [pushEvent, surveyUnitData])

  useEffect(() => {
    if (activeErrors) {
      scrollAndFocusToFirstError()
    }
  }, [activeErrors])

  useAddPreLogoutAction(async () => {
    if (mode === MODE_TYPE.COLLECT && !hasBeenSent(initialState)) {
      const { updateDataAndStateData } = props

      const data = getChangedData()

      return updateDataAndStateData({
        stateData: getCurrentStateData.current(),
        data: isObjectEmpty(data.COLLECTED ?? {}) ? undefined : data.COLLECTED,
        onSuccess: resetChangedData,
      })
    }
  })

  //When page change
  useUpdateEffect(() => {
    pushEvent(
      computeNewPageEvent({
        idSU: surveyUnitData?.id ?? '',
        page: currentPage,
        pageTag,
      })
    )

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
    // Persist data and stateData when page change in "collect" mode
    if (mode === MODE_TYPE.COLLECT && !hasBeenSent(initialState)) {
      const { updateDataAndStateData } = props

      const data = getChangedData()

      updateDataAndStateData({
        stateData: getCurrentStateData.current(),
        data: isObjectEmpty(data.COLLECTED ?? {}) ? undefined : data.COLLECTED,
        onSuccess: resetChangedData,
      })
    }
  }, [currentPage, pageTag])

  // Persist data when component unmount (ie when navigate etc...)
  useEffect(() => {
    return () => {
      if (mode === MODE_TYPE.COLLECT && !hasBeenSent(initialState)) {
        const { updateDataAndStateData } = props
        const data = getChangedData()

        if (!isObjectEmpty(data.COLLECTED ?? {})) {
          updateDataAndStateData({
            // eslint-disable-next-line react-hooks/exhaustive-deps
            stateData: getCurrentStateData.current(),
            data: data.COLLECTED,
            onSuccess: resetChangedData,
          })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()

  const handleDepositProofClick = async () => {
    switch (mode) {
      case MODE_TYPE.VISUALIZE: {
        downloadAsJsonRef.current()
        navigate({ to: '/visualize', params: {} })
        break
      }
      case MODE_TYPE.COLLECT: {
        return props.getDepositProof()
      }
      case MODE_TYPE.REVIEW:
      default:
        break
    }
  }

  const { components, bottomComponents } = getComponents().reduce<{
    components: LunaticComponentsProps
    bottomComponents: LunaticComponentsProps
  }>(
    (acc, c) => {
      // In sequence pagination we do not want to display Sequence components
      if (pagination === 'sequence' && c.componentType === 'Sequence') {
        return acc // Skip this component
      }

      // We want to be able to display at the bottom components with position "bottom"
      if (c.position === 'bottom') {
        return {
          components: acc.components,
          bottomComponents: [...acc.bottomComponents, c],
        }
      }

      return {
        components: [...acc.components, c],
        bottomComponents: acc.bottomComponents,
      }
    },
    { components: [], bottomComponents: [] }
  )

  const handleNextClick = (
    goNext: () => void,
    surveyUnitData: SurveyUnitData | undefined
  ) => {
    pushEvent(
      computeClickEvent({
        idSU: surveyUnitData?.id ?? '',
        element: 'next',
      })
    )
    goNext()
  }

  const handlePreviousClick = (
    goPrevious: () => void,
    surveyUnitData: SurveyUnitData | undefined
  ) => {
    pushEvent(
      computeClickEvent({
        idSU: surveyUnitData?.id ?? '',
        element: 'previous',
      })
    )
    goPrevious()
  }

  return (
    <div ref={containerRef}>
      <LunaticProvider>
        <SurveyContainer
          handleNextClick={() => handleNextClick(goNext, surveyUnitData)}
          handlePreviousClick={() =>
            handlePreviousClick(goPrevious, surveyUnitData)
          }
          handleDownloadData={downloadAsJsonRef.current} // Visualize
          currentPage={currentPage}
          mode={mode}
          handleDepositProofClick={handleDepositProofClick}
          pagination={pagination}
          overview={overview}
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
              <EndPage date={surveyUnitData?.stateData?.date} />
            )}
            <WelcomeModal
              goBack={() =>
                initialCurrentPage
                  ? goToPage({ page: initialCurrentPage })
                  : null
              }
              open={shouldWelcome}
            />
            <ValidationModal actionsRef={validationModalActionsRef} />
            {mode === MODE_TYPE.VISUALIZE && <VTLDevTools />}
          </div>
        </SurveyContainer>
      </LunaticProvider>
    </div>
  )
}
