import type { LunaticData } from '@inseefr/lunatic'

/**
 * Remove empty variables (i.e. equal to null) to reduce payload size in API calls
 * (except for COLLECTED since it means something when empty)
 */
export function trimCollectedData(
  data: LunaticData['COLLECTED']
): LunaticData['COLLECTED'] {
  const trimmedData = Object.assign({}, data)
  for (const key in trimmedData) {
    if (trimmedData[key]['EDITED'] === null) delete trimmedData[key]['EDITED']
    if (trimmedData[key]['FORCED'] === null) delete trimmedData[key]['FORCED']
    if (trimmedData[key]['INPUTTED'] === null)
      delete trimmedData[key]['INPUTTED']
    if (trimmedData[key]['PREVIOUS'] === null)
      delete trimmedData[key]['PREVIOUS']
  }
  return trimmedData
}
