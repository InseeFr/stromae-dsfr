import type { SurveyUnit } from '@/models/SurveyUnit'
import type {
  CollectedData,
  CollectedValues,
  VariableType,
} from '@/models/SurveyUnitData'

type ExtendedCollectedValues = CollectedValues &
  Partial<Record<'EDITED' | 'FORCED' | 'INPUTED' | 'PREVIOUS', VariableType>>

type ExtendedCollectedData = Record<string, ExtendedCollectedValues>

/**
 * Remove useless variables to reduce payload size in API calls
 * (i.e. everything except COLLECTED)
 */
export function trimCollectedData(data: ExtendedCollectedData): CollectedData {
  const trimmedData = structuredClone(data)
  for (const key in trimmedData) {
    delete trimmedData[key]['EDITED']
    delete trimmedData[key]['FORCED']
    delete trimmedData[key]['INPUTED']
    delete trimmedData[key]['PREVIOUS']
  }
  return trimmedData
}

/**
 * Initialize the survey unit with the expected format since it can be empty or
 * partial. State data must be initialized the first time.
 */
export function computeSurveyUnit(partial?: Partial<SurveyUnit>): SurveyUnit {
  const surveyUnitId = partial?.id ?? ''
  const questionnaireId = partial?.questionnaireId ?? ''

  return {
    id: surveyUnitId,
    questionnaireId,
    personalization: partial?.personalization,
    data: partial?.data,
    stateData: partial?.stateData,
  }
}
