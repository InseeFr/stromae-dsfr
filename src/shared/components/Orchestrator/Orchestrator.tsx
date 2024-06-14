import { fr } from '@codegouvfr/react-dsfr'
import {
  LunaticComponents,
  useLunatic,
  type LunaticData,
  type LunaticError,
  type LunaticSource,
} from '@inseefr/lunatic'
import { useNavigate } from '@tanstack/react-router'
import type { StateData } from 'model/StateData'
import type { SurveyUnitData } from 'model/SurveyUnitData'
import type { SurveyUnitMetadata } from 'model/api'
import { useEffect, useRef, useState } from 'react'
import { useAddPreLogoutAction } from 'shared/hooks/prelogout'
import { downloadAsJson } from 'utils/downloadAsJson'
import { isObjectEmpty } from 'utils/isObjectEmpty'
import { useRefSync } from 'utils/useRefSync'
import { useUpdateEffect } from 'utils/useUpdateEffect'
import { EndPage } from './CustomPages/EndPage'
import { ValidationModal } from './CustomPages/ValidationModal'
import { ValidationPage } from './CustomPages/ValidationPage'
import { WelcomePage } from './CustomPages/WelcomePage'
import { SurveyContainer } from './SurveyContainer'
import { slotComponents } from './slotComponents'
import { useStromaeNavigation } from './useStromaeNavigation'
import { isBlockingError, isSameErrors } from './utils/controls'
import type {
  LunaticComponentsProps,
  LunaticGetReferentiel,
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
    surveyUnitData?: SurveyUnitData
    getReferentiel: LunaticGetReferentiel
    metadata?: SurveyUnitMetadata
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
    }) => void
    getDepositProof: () => Promise<void>
  }
}

export function Orchestrator(props: OrchestratorProps) {
  const { source, surveyUnitData, getReferentiel, mode, metadata } = props

  const initialCurrentPage = surveyUnitData?.stateData?.currentPage

  const pagination = source.pagination ?? 'question'

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
    activeControls: true,
    getReferentiel,
    autoSuggesterLoading: true,
    trackChanges: mode === 'collect',
    withOverview: true,
  })

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
  const goNextWithControls = () => {
    const { currentErrors } = compileControls()

    // No errors, continue
    if (!currentErrors) {
      setActiveErrors(undefined)
      goNextLunatic()
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
      goNextLunatic()
      return
    }
    setActiveErrors(currentErrors)
  }

  const { currentPage, goNext, goToPage, goPrevious } = useStromaeNavigation({
    goNextLunatic: goNextWithControls,
    goPrevLunatic,
    isFirstPage,
    isLastPage,
    goToLunaticPage,
    initialCurrentPage,
    openValidationModal: () => validationModalActionsRef.current.open(),
  })

  const getCurrentStateData = (): StateData => {
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
  }

  const downloadAsJsonRef = useRefSync(() => {
    downloadAsJson<SurveyUnitData>({
      dataToDownload: {
        data: getData(false),
        stateData: getCurrentStateData(),
        personalization: surveyUnitData?.personalization,
      },
      //The label of source is not dynamic
      filename: `${source.label?.value}-${new Date().toLocaleDateString()}`,
    })
  })

  useAddPreLogoutAction(() => {
    if (mode !== 'collect') return

    const { updateDataAndStateData } = props

    const data = getChangedData()

    updateDataAndStateData({
      stateData: getCurrentStateData(),
      data: isObjectEmpty(data.COLLECTED ?? {}) ? undefined : data.COLLECTED,
      onSuccess: resetChangedData,
    })
  })
  // Persist data and stateData when page change in "collect" mode
  useUpdateEffect(() => {
    if (mode !== 'collect') return
    const { updateDataAndStateData } = props

    const data = getChangedData()

    updateDataAndStateData({
      stateData: getCurrentStateData(),
      data: isObjectEmpty(data.COLLECTED ?? {}) ? undefined : data.COLLECTED,
      onSuccess: resetChangedData,
    })
  }, [currentPage, pageTag])

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

  return (
    <div className={fr.cx('fr-container--fluid')}>
      <LunaticProvider>
        <div>
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
            }
          >
            <div className={fr.cx('fr-mb-4v')}>
              {currentPage === 'welcomePage' && (
                <WelcomePage
                  initialCurrentPage={initialCurrentPage}
                  goToPage={goToPage}
                  metadata={metadata}
                />
              )}
              {currentPage === 'lunaticPage' && (
                <LunaticComponents
                  autoFocusKey={pageTag}
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
              <ValidationModal actionsRef={validationModalActionsRef} />
            </div>
          </SurveyContainer>
        </div>
      </LunaticProvider>
    </div>
  )
}
