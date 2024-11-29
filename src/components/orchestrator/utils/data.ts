import type { LunaticData } from '@inseefr/lunatic'

/**
 * Remove useless variables to reduce payload size in API calls
 * (i.e. everything except COLLECTED)
 */
export function trimCollectedData(
  data: LunaticData['COLLECTED'],
): LunaticData['COLLECTED'] {
  const trimmedData = structuredClone(data)
  for (const key in trimmedData) {
    delete trimmedData[key]['EDITED']
    delete trimmedData[key]['FORCED']
    delete trimmedData[key]['INPUTTED']
    delete trimmedData[key]['PREVIOUS']
  }
  return trimmedData
}
