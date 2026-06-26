import { renderHook } from '@testing-library/react'
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import {
  EventDtoAggregateType,
  EventDtoEventType,
  EventPayloadDtoMode,
} from '@/models/api'
import type { Interrogation } from '@/models/interrogation'

import { useEvents } from './useEvents'

const { mutateAsync } = vi.hoisted(() => ({
  mutateAsync: vi.fn(),
}))

vi.mock('@/api/events-controller', () => ({
  useAddEvent: () => ({ mutateAsync }),
}))

const noopChangedData = () => ({ COLLECTED: {} })

const baseInterrogation: Interrogation = {
  id: 'PROTO10',
  questionnaireId: 'qid',
  stateData: {
    state: 'COMPLETED',
    date: 1,
    currentPage: '1',
    multimode: { state: null, date: 1 },
  },
}

/** Render useEvents once, then rerender with a mutated interrogation to fire the change callbacks. */
function renderAndChange(next: Interrogation) {
  const { rerender } = renderHook(
    ({ interrogation }) => useEvents(interrogation, '1', noopChangedData),
    { initialProps: { interrogation: baseInterrogation } },
  )
  rerender({ interrogation: next })
}

beforeAll(() => {
  import.meta.env.VITE_MULTIMODE_ENABLED = 'true'
})

afterAll(() => {
  import.meta.env.VITE_MULTIMODE_ENABLED = '0'
})

beforeEach(() => {
  mutateAsync.mockReset()
  mutateAsync.mockResolvedValue(undefined)
})

describe('useEvents', () => {
  it('sends a MULTIMODE_MOVED event when multimode state becomes IS_MOVED', () => {
    renderAndChange({
      ...baseInterrogation,
      stateData: {
        ...baseInterrogation.stateData!,
        multimode: { state: 'IS_MOVED', date: 2 },
      },
    })

    expect(mutateAsync).toHaveBeenCalledTimes(1)
    expect(mutateAsync).toHaveBeenCalledWith({
      data: {
        eventType: EventDtoEventType.MULTIMODE_MOVED,
        aggregateType: EventDtoAggregateType.QUESTIONNAIRE,
        payload: {
          interrogationId: 'PROTO10',
          mode: EventPayloadDtoMode.CAWI,
        },
      },
    })
  })

  it('sends a QUESTIONNAIRE_LEAF_STATES_UPDATED event with ISO dates and no cells', () => {
    const date = 1_700_000_000_000

    renderAndChange({
      ...baseInterrogation,
      stateData: {
        ...baseInterrogation.stateData!,
        leafStates: [{ state: 'COMPLETED', date }],
      },
    })

    expect(mutateAsync).toHaveBeenCalledTimes(1)
    expect(mutateAsync).toHaveBeenCalledWith({
      data: {
        eventType: EventDtoEventType.QUESTIONNAIRE_LEAF_STATES_UPDATED,
        aggregateType: EventDtoAggregateType.QUESTIONNAIRE,
        payload: {
          interrogationId: 'PROTO10',
          mode: EventPayloadDtoMode.CAWI,
          leafStates: [
            { state: 'COMPLETED', date: new Date(date).toISOString() },
          ],
        },
      },
    })
  })

  it('maps the interrogation state to its event type (INIT)', () => {
    renderAndChange({
      ...baseInterrogation,
      stateData: { ...baseInterrogation.stateData!, state: 'INIT' },
    })

    expect(mutateAsync).toHaveBeenCalledTimes(1)
    expect(mutateAsync).toHaveBeenCalledWith({
      data: {
        eventType: EventDtoEventType.QUESTIONNAIRE_INIT,
        aggregateType: EventDtoAggregateType.QUESTIONNAIRE,
        payload: {
          interrogationId: 'PROTO10',
          mode: EventPayloadDtoMode.CAWI,
        },
      },
    })
  })

  it('does not send an event for states without a mapping (TOEXTRACT)', () => {
    renderAndChange({
      ...baseInterrogation,
      stateData: { ...baseInterrogation.stateData!, state: 'TOEXTRACT' },
    })

    expect(mutateAsync).not.toHaveBeenCalled()
  })

  it('sends nothing when multimode is disabled', () => {
    import.meta.env.VITE_MULTIMODE_ENABLED = '0'
    try {
      renderAndChange({
        ...baseInterrogation,
        stateData: {
          ...baseInterrogation.stateData!,
          multimode: { state: 'IS_MOVED', date: 2 },
        },
      })
      expect(mutateAsync).not.toHaveBeenCalled()
    } finally {
      import.meta.env.VITE_MULTIMODE_ENABLED = 'true'
    }
  })
})
