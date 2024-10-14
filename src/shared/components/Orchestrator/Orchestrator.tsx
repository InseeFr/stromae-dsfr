import type { Metadata } from '@/model/Metadata'
import type { StateData } from '@/model/StateData'
import type { SurveyUnitData } from '@/model/SurveyUnitData'
import { useAddPreLogoutAction } from '@/shared/hooks/prelogout'
import { downloadAsJson } from '@/utils/downloadAsJson'
import { isObjectEmpty } from '@/utils/isObjectEmpty'
import { hasBeenSent, shouldDisplayWelcomeModal } from '@/utils/orchestrator'
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
    mode: 'visualize'
  }

  export type Review = {
    mode: 'review'
  }

  export type Collect = {
    mode: 'collect'
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

  const initialCurrentPage = surveyUnitData?.stateData?.currentPage
  const initialState = surveyUnitData?.stateData?.state
  const pagination = source.pagination ?? 'question'

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const pageTagRef = useRef<LunaticPageTag>('1')

  const lunaticLogger = useMemo(
    () =>
      mode === 'visualize'
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
    trackChanges: mode === 'collect',
    withOverview: true,
  })

  pageTagRef.current = pageTag

  const [activeErrors, setActiveErrors] = useState<
    Record<string, LunaticError[]> | undefined
  >(undefined)

  useEffect(() => {
    if (activeErrors) {
      scrollAndFocusToFirstError()
    }
  }, [activeErrors])

  const validationModalActionsRef = useRef({
    open: () => Promise.resolve(),
  })

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
      case 'endPage':
        return { date: Date.now(), currentPage, state: 'VALIDATED' }
      case 'lunaticPage':
        return { date: Date.now(), currentPage: pageTag, state: 'INIT' }
      case 'validationPage':
      case 'welcomePage':
      default:
        return { date: Date.now(), currentPage, state: 'INIT' }
    }
  })

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

  useAddPreLogoutAction(async () => {
    if (mode === 'collect' && !hasBeenSent(initialState)) {
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
    if (mode === 'collect' && !hasBeenSent(initialState)) {
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
      if (mode === 'collect' && !hasBeenSent(initialState)) {
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
      case 'visualize': {
        downloadAsJsonRef.current()
        navigate({ to: '/visualize', params: {} })
        break
      }
      case 'collect': {
        return props.getDepositProof()
      }
      case 'review':
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

  // Displays the welcome modal which allows to come back to current page
  const shouldWelcome = shouldDisplayWelcomeModal(
    initialState,
    initialCurrentPage
  )

  return (
    <div ref={containerRef}>
      <LunaticProvider>
        <SurveyContainer
          handleNextClick={goNext}
          handlePreviousClick={goPrevious}
          handleDownloadData={downloadAsJsonRef.current}
          currentPage={currentPage}
          mode={mode}
          handleDepositProofClick={handleDepositProofClick}
          pagination={pagination}
          overview={overview}
          isSequencePage={isSequencePage(components)}
          bottomContent={
            bottomComponents.length > 0 && (
              <div className={fr.cx('fr-my-10v')}>
                {currentPage === 'lunaticPage' && (
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
            {currentPage === 'welcomePage' && (
              <WelcomePage metadata={metadata} />
            )}
            {currentPage === 'lunaticPage' && (
              <LunaticComponents
                components={components}
                slots={slotComponents}
                componentProps={() => ({
                  errors: activeErrors,
                })}
              />
            )}
            {currentPage === 'validationPage' && <ValidationPage />}
            {currentPage === 'endPage' && (
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
            {mode === 'visualize' && <VTLDevTools />}
          </div>
        </SurveyContainer>
      </LunaticProvider>
    </div>
  )
}
