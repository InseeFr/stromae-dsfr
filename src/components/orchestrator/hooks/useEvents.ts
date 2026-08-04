import type { getArticulationState } from '@inseefr/lunatic'

import { usePostEvents } from '@/api/10-events'
import {
  LeafStatesUpdatedEventType,
  MultimodeMovedEventType,
  QuestionnaireEventType,
} from '@/models/api'
import type { Interrogation } from '@/models/interrogation'
import type { LunaticPageTag } from '@/models/lunaticType.ts'
import { hasMultimode } from '@/utils/env.ts'

import { useCallbackOnValueChange } from './useCallbackOnValueChange.ts'

/**
 * Trigger events when specific operations happens during interrogation
 */
export function useEvents(
  interrogation: Interrogation,
  getLeafStatesData: () => ReturnType<typeof getArticulationState>,
  pageTag: LunaticPageTag,
  getChangedData: (reset: boolean) => Record<string, unknown>,
) {
  // Disable events api if multimode is not enabled
  if (!hasMultimode()) {
    return
  }

  /* eslint-disable react-hooks/rules-of-hooks */
  const { mutateAsync } = usePostEvents()

  // Send an event when multimode state changes
  useCallbackOnValueChange(
    interrogation.stateData?.multimode?.state ?? null,
    (multimodeState) => {
      if (!multimodeState || !interrogation.id) {
        return
      }
      mutateAsync({
        data: {
          type: multimodeState.replace(
            'IS_',
            'MUTLIMODE_',
          ) as MultimodeMovedEventType,
          payload: {
            interrogationId: interrogation.id,
          },
        },
      })
    },
  )

  // Send an event when leafStates changes
  useCallbackOnValueChange(
    interrogation.stateData?.leafStates,
    (leafStates) => {
      if (!leafStates || !interrogation.id) {
        return
      }

      // Inject cell data inside the leafStates
      const data = getLeafStatesData()
      const leafStatesWithCells = leafStates.map((leafState, index) => {
        return {
          ...leafState,
          cells: data.items[index].cells,
        }
      })

      mutateAsync({
        data: {
          type: LeafStatesUpdatedEventType.LEAF_STATES_UPDATED,
          payload: {
            interrogationId: interrogation.id,
            leafStates: leafStatesWithCells,
          },
        },
      })
    },
  )

  // Send an event when data change between pages
  useCallbackOnValueChange(pageTag, () => {
    // No data where changed between pages
    const changedData = getChangedData(true) as {
      COLLECTED: Record<string, unknown>
    }
    if (Object.keys(changedData.COLLECTED).length === 0 || !interrogation.id) {
      return
    }

    mutateAsync({
      data: {
        type: `QUESTIONNAIRE_UPDATED` as QuestionnaireEventType,
        payload: {
          interrogationId: interrogation.id,
          pageTag: pageTag
        },
      },
    })
  })

  // Send an event when the interrogation state changes
  useCallbackOnValueChange(interrogation.stateData?.state, (state) => {
    if (!state || !interrogation.id) {
      return
    }
    mutateAsync({
      data: {
        type: `QUESTIONNAIRE_${state}` as QuestionnaireEventType,
        payload: {
          interrogationId: interrogation.id,
        },
      },
    })
  })
}
