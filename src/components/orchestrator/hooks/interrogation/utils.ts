import type { InterrogationData } from '@/models/interrogationData'

import { trimCollectedData } from '../../utils/data'

/**
 * Check if there is collected value with the changes
 */
export function hasDataChanged(changedData: InterrogationData): boolean {
  if (changedData.COLLECTED) {
    return Object.keys(changedData.COLLECTED).length > 0
  }
  return false
}

/**
 * Merge changes with the existing data
 */
export function computeUpdatedData(
  currentInterrogationData: InterrogationData,
  changedData: InterrogationData,
): InterrogationData {
  if (hasDataChanged(changedData)) {
    return computeFullData(currentInterrogationData, changedData)
  }
  return currentInterrogationData
}


/**
 * Retrieve the full data, merging the changes into the current data
 */
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
