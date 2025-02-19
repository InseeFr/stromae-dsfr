import type { LunaticData } from '@inseefr/lunatic'

/**
 * Lunatic removed EDITED, FORCED, INPUTTED, PREVIOUS from its data type,
 * but those states still can be in the data for "old" questionnaires, for now we recreate it.
 */
type ExtendedCollectedData =
  | Record<
      string,
      Partial<{
        COLLECTED: unknown
        EDITED?: unknown
        FORCED?: unknown
        INPUTTED?: unknown
        PREVIOUS?: unknown
      }>
    >
  | undefined

/**
 * Remove useless variables to reduce payload size in API calls
 * (i.e. everything except COLLECTED)
 */
export function trimCollectedData(
  data: ExtendedCollectedData,
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
