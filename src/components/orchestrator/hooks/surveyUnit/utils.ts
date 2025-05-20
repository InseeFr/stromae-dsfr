import type { CollectedValues, SurveyUnitData } from '@/models/SurveyUnitData'

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
    return computeFullData(
      currentSurveyUnitData,
      cleanCollectedData(changedData),
    )
  }
  return currentSurveyUnitData
}

/** get full data, computing current data with changed data */
function computeFullData(
  currentData: SurveyUnitData,
  changedData: SurveyUnitData,
): SurveyUnitData {
  return {
    CALCULATED: { ...currentData.CALCULATED, ...changedData.CALCULATED },
    EXTERNAL: { ...currentData.EXTERNAL, ...changedData.EXTERNAL },
    COLLECTED: { ...currentData.COLLECTED, ...changedData.COLLECTED },
  }
}

/** Remove null data from COLLECTED data. */
function cleanCollectedData(data: SurveyUnitData = {}): SurveyUnitData {
  const { COLLECTED } = data || {}

  if (!COLLECTED) {
    return data
  }

  const newCollected: typeof COLLECTED = Object.entries(COLLECTED).reduce(
    (acc: typeof COLLECTED, [variableName, content]) => {
      // Reduce each content object to remove null values
      const cleanedContent: CollectedValues = Object.entries(content).reduce(
        (accContent, [type, value]) => {
          // If the value is not null, we keep it
          if (value !== null) {
            accContent[type as keyof CollectedValues] = value
          }
          return accContent
        },
        {} as CollectedValues,
      )
      acc[variableName] = cleanedContent

      return acc
    },
    {},
  )

  return {
    ...data,
    COLLECTED: newCollected,
  }
}
