import type { InterrogationData } from '@/models/interrogationData'

import { trimCollectedData } from '../../utils/data'

export function hasDataChanged(changedData: InterrogationData): boolean {
  if (changedData.COLLECTED) {
    return Object.keys(changedData.COLLECTED).length > 0
  }
  return false
}

/** Get updated interrogation data, using the current data and changed data */
export function computeUpdatedData(
  currentInterrogationData: InterrogationData,
  changedData: InterrogationData,
): InterrogationData {
  if (hasDataChanged(changedData)) {
    return computeFullData(currentInterrogationData, changedData)
  }
  return currentInterrogationData
}

/** get full data, computing current data with changed data */
function computeFullData(
  currentData: InterrogationData,
  changedData: InterrogationData,
): InterrogationData {
  const changedCollectedData = changedData.COLLECTED
    ? trimCollectedData(changedData.COLLECTED)
    : undefined
  return {
    CALCULATED: { ...currentData.CALCULATED, ...changedData.CALCULATED },
    EXTERNAL: { ...currentData.EXTERNAL, ...changedData.EXTERNAL },
    COLLECTED: { ...currentData.COLLECTED, ...changedCollectedData },
  }
}
