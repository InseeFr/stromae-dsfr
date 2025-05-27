import { useState } from 'react'

import { PAGE_TYPE } from '@/constants/page'
import type { PageType } from '@/models/page'
import type { QuestionnaireState } from '@/models/questionnaireState'
import type { SurveyUnit } from '@/models/surveyUnit'
import type { SurveyUnitData } from '@/models/surveyUnitData'

import { computeUpdatedData, hasDataChanged } from './utils'

export function useSurveyUnit(initialSurveyUnit: SurveyUnit) {
  const [surveyUnitData, setSurveyUnitData] = useState<SurveyUnitData>(
    initialSurveyUnit.data ?? {},
  )
  const [surveyUnitState, setSurveyUnitState] = useState<
    QuestionnaireState | undefined
  >(initialSurveyUnit.stateData?.state ?? undefined)

  /** Compute new state and send an update if necessary. */
  function updateState(
    hasDataChanged: boolean,
    currentPage: PageType,
  ): QuestionnaireState | undefined {
    // if there was no state and data has changed, initialize the state (INIT)
    if (!surveyUnitState && hasDataChanged) {
      const newState = 'INIT'
      setSurveyUnitState(newState)
      return newState
    }

    // on the end page, update state to VALIDATED
    if (currentPage === PAGE_TYPE.END) {
      const newState = 'VALIDATED'
      setSurveyUnitState(newState)
      return newState
    }

    // state does not changed
    return surveyUnitState
  }

  /**
   * Compute new survey unit, and send a state update if the state (`"INIT"`,
   * `"COMPLETED"`...) has changed.
   */
  function updateSurveyUnit(
    changedData: SurveyUnitData,
    currentPage: PageType,
  ): SurveyUnit {
    const hasDataBeenUpdated = hasDataChanged(changedData)
    let newData
    if (hasDataBeenUpdated) {
      newData = computeUpdatedData(surveyUnitData, changedData)
      setSurveyUnitData(newData)
    }

    const newState = updateState(hasDataBeenUpdated, currentPage)

    return {
      ...initialSurveyUnit,
      data: hasDataBeenUpdated && newData ? newData : surveyUnitData,
      // provide stateData only if there is state (exclude null state)
      ...(newState && {
        stateData: {
          state: newState,
          date: new Date().getTime(),
          currentPage: currentPage ?? PAGE_TYPE.WELCOME,
        },
      }),
    }
  }

  return {
    surveyUnitData,
    updateSurveyUnit,
  }
}
