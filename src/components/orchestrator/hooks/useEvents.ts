import type { Interrogation } from '@/models/interrogation.ts'
import { usePostEvents } from '@/api/10-events.ts'
import { LeafStatesUpdatedEventType, MultimodeMovedEventType, QuestionnaireEventType } from '@/models/api'
import { useValueChanged } from '@/components/orchestrator/hooks/useValueChanged.ts'

/**
 * Trigger events when specific operation happens during interrogation
 */
export function useEvents(interrogration: Interrogation) {
  const {mutateAsync} = usePostEvents()

  // Send an event when multimode state changes
  useValueChanged(interrogration.stateData?.multimode?.state ?? null, (multimodeState) => {
    if (!multimodeState || !interrogration.id) {
      return;
    }
    mutateAsync({
      data: {
        type: multimodeState.replace('IS_', 'MUTLIMODE_') as MultimodeMovedEventType ,
        payload: {
          interrogationId: interrogration.id
        }
      }
    })
  })

  // Send an event when leafStates changes
  useValueChanged(interrogration.stateData?.leafStates, (leafStates) => {
    if (!leafStates || !interrogration.id) {
      return;
    }
    mutateAsync({
      data: {
        type: LeafStatesUpdatedEventType.LEAF_STATES_UPDATED,
        payload: {
          interrogationId: interrogration.id,
          leafStates
        }
      }
    })
  })

  // Send an event when the interrogation state changes
  useValueChanged(interrogration.stateData?.state, (state) => {
    if (!state || !interrogration.id) {
      return
    }
    mutateAsync({
      data: {
        type: `QUESTIONNAIRE_${state}` as QuestionnaireEventType,
        payload: {
          interrogationId: interrogration.id,
        }
      }
    })
  })
}
