import { usePostEvents } from '@/api/10-events'
import {
  LeafStatesUpdatedEventType,
  MultimodeMovedEventType,
  QuestionnaireEventType,
} from '@/models/api'
import type { Interrogation } from '@/models/interrogation'
import { hasMultimode } from '@/utils/env.ts'

import { useCallbackOnValueChange } from './useCallbackOnValueChange.ts'

/**
 * Trigger events when specific operation happens during interrogation
 */
export function useEvents(interrogation: Interrogation) {
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
      mutateAsync({
        data: {
          type: LeafStatesUpdatedEventType.LEAF_STATES_UPDATED,
          payload: {
            interrogationId: interrogation.id,
            leafStates,
          },
        },
      })
    },
  )

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
