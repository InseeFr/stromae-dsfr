import { useAddEvent } from '@/api/events-controller'
import {
  EventDtoAggregateType,
  EventDtoEventType,
  EventPayloadDtoMode,
} from '@/models/api'
import type { Interrogation } from '@/models/interrogation'
import type { LunaticPageTag } from '@/models/lunaticType.ts'
import type { QuestionnaireState } from '@/models/questionnaireState'
import { hasMultimode } from '@/utils/env.ts'

import { useCallbackOnValueChange } from './useCallbackOnValueChange.ts'

// stromae-dsfr is the self-administered web frontend, so the collect mode is CAWI
const COLLECTION_MODE = EventPayloadDtoMode.CAWI

/**
 * Map an interrogation state to its event type. States that do not map to an
 * event (TOEXTRACT, EXTRACTED) return undefined and emit nothing.
 */
function stateToEventType(state: QuestionnaireState | undefined) {
  switch (state) {
    case 'INIT':
      return EventDtoEventType.QUESTIONNAIRE_INIT
    case 'VALIDATED':
      return EventDtoEventType.QUESTIONNAIRE_VALIDATED
    case 'COMPLETED':
      return EventDtoEventType.QUESTIONNAIRE_COMPLETED
    default:
      return undefined
  }
}

/**
 * Trigger events when specific operations happens during interrogation
 */
export function useEvents(
  interrogation: Interrogation,
  pageTag: LunaticPageTag,
  getChangedData: (reset: boolean) => Record<string, unknown>,
) {
  // Disable events api if multimode is not enabled
  if (!hasMultimode()) {
    return
  }

  /* eslint-disable react-hooks/rules-of-hooks */
  const { mutateAsync } = useAddEvent()

  // Send an event when multimode state changes (only MULTIMODE_MOVED exists)
  useCallbackOnValueChange(
    interrogation.stateData?.multimode?.state ?? null,
    (multimodeState) => {
      if (multimodeState !== 'IS_MOVED' || !interrogation.id) {
        return
      }
      mutateAsync({
        data: {
          eventType: EventDtoEventType.MULTIMODE_MOVED,
          aggregateType: EventDtoAggregateType.QUESTIONNAIRE,
          payload: {
            interrogationId: interrogation.id,
            mode: COLLECTION_MODE,
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
          eventType: EventDtoEventType.QUESTIONNAIRE_LEAF_STATES_UPDATED,
          aggregateType: EventDtoAggregateType.QUESTIONNAIRE,
          payload: {
            interrogationId: interrogation.id,
            mode: COLLECTION_MODE,
            leafStates: leafStates.map(({ state, date }) => ({
              state: state ?? undefined,
              date: new Date(date).toISOString(),
            })),
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
        eventType: EventDtoEventType.QUESTIONNAIRE_UPDATED,
        aggregateType: EventDtoAggregateType.QUESTIONNAIRE,
        payload: {
          interrogationId: interrogation.id,
          mode: COLLECTION_MODE,
        },
      },
    })
  })

  // Send an event when the interrogation state changes
  useCallbackOnValueChange(interrogation.stateData?.state, (state) => {
    const eventType = stateToEventType(state)
    if (!eventType || !interrogation.id) {
      return
    }
    mutateAsync({
      data: {
        eventType,
        aggregateType: EventDtoAggregateType.QUESTIONNAIRE,
        payload: {
          interrogationId: interrogation.id,
          mode: COLLECTION_MODE,
        },
      },
    })
  })
}
