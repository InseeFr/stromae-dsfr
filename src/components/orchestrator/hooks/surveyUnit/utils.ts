import type { SurveyUnitData } from '@/models/surveyUnitData'

import { trimCollectedData } from '../../utils/data'

export function hasDataChanged(changedData: SurveyUnitData): boolean {
  if (changedData.COLLECTED) {
    return Object.keys(changedData.COLLECTED).length > 0
  }
  return false
}

/** Get updated surveyUnit data, using the current data and changed data */
export function computeUpdatedData(
  currentSurveyUnitData: SurveyUnitData,
  changedData: SurveyUnitData,
): SurveyUnitData {
  if (hasDataChanged(changedData)) {
    return computeFullData(currentSurveyUnitData, changedData)
  }
  return currentSurveyUnitData
}

/** get full data, computing current data with changed data */
function computeFullData(
  currentData: SurveyUnitData,
  changedData: SurveyUnitData,
): SurveyUnitData {
  const changedCollectedData = changedData.COLLECTED
    ? trimCollectedData(changedData.COLLECTED)
    : undefined
  return {
    CALCULATED: { ...currentData.CALCULATED, ...changedData.CALCULATED },
    EXTERNAL: { ...currentData.EXTERNAL, ...changedData.EXTERNAL },
    COLLECTED: { ...currentData.COLLECTED, ...changedCollectedData },
  }
}
