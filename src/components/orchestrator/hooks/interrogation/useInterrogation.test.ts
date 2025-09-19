import { act, renderHook } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest'

import { PAGE_TYPE } from '@/constants/page'
import type {
  LunaticGetArticulationState,
  LunaticGetMultimode,
} from '@/models/lunaticType'
import type { StateData } from '@/models/stateData'

import { useInterrogation } from './useInterrogation'

beforeAll(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(2024, 9, 28, 17, 7, 33, 11))
})

afterAll(() => {
  vi.useRealTimers()
})

describe('Use interrogation', () => {
  test('inits correctly interrogation data and set state as INIT', async () => {
    const { result } = renderHook(() =>
      useInterrogation({ id: 'id', questionnaireId: 'qid', data: {} }),
    )

    expect(result.current.interrogation.data).toStrictEqual({})

    act(() => {
      const res = result.current.updateInterrogation(
        {
          COLLECTED: { Q1: { COLLECTED: 'new data' } },
        },
        '1',
      )
      expect(res).toMatchObject({
        data: {
          CALCULATED: {},
          COLLECTED: { Q1: { COLLECTED: 'new data' } },
          EXTERNAL: {},
        },
        id: 'id',
        questionnaireId: 'qid',
        stateData: {
          currentPage: '1',
          date: vi.getMockedSystemTime()?.valueOf(),
          state: 'INIT',
        },
      })
    })

    expect(result.current.interrogation.data).toStrictEqual({
      CALCULATED: {},
      COLLECTED: { Q1: { COLLECTED: 'new data' } },
      EXTERNAL: {},
    })
  })

  test('does not set state if there is no change and no initial state', () => {
    const { result } = renderHook(() =>
      useInterrogation({ id: 'id', questionnaireId: 'qid', data: {} }),
    )

    act(() => {
      const res = result.current.updateInterrogation({}, '1')
      expect(res.stateData).toBeUndefined()
    })

    expect(result.current.interrogation.data).toStrictEqual({})
  })

  test('sets state to VALIDATED when on end page', () => {
    const { result } = renderHook(() =>
      useInterrogation({
        id: 'id',
        questionnaireId: 'qid',
        data: { COLLECTED: { Q1: { COLLECTED: 'data' } } },
        stateData: { state: 'INIT', date: 123, currentPage: '2' },
      }),
    )

    act(() => {
      const res = result.current.updateInterrogation(
        { COLLECTED: { Q1: { COLLECTED: 'new data' } } },
        PAGE_TYPE.END,
      )
      expect(res).toMatchObject({
        data: {
          CALCULATED: {},
          COLLECTED: { Q1: { COLLECTED: 'new data' } },
          EXTERNAL: {},
        },
        id: 'id',
        questionnaireId: 'qid',
        stateData: {
          currentPage: PAGE_TYPE.END,
          date: vi.getMockedSystemTime()?.valueOf(),
          state: 'VALIDATED',
        },
      })
    })
  })

  test('does not update the state on a lunatic page if state was already INIT', async () => {
    const { result } = renderHook(() =>
      useInterrogation({
        id: 'id',
        questionnaireId: 'qid',
        data: {
          COLLECTED: { Q1: { COLLECTED: 'old data' } },
        },
        stateData: { state: 'INIT', date: 123, currentPage: '1' },
      }),
    )

    act(() => {
      const res = result.current.updateInterrogation(
        {
          COLLECTED: { Q1: { COLLECTED: 'new data' } },
        },
        '2',
      )
      expect(res).toMatchObject({
        data: {
          CALCULATED: {},
          COLLECTED: { Q1: { COLLECTED: 'new data' } },
          EXTERNAL: {},
        },
        id: 'id',
        questionnaireId: 'qid',
        stateData: {
          currentPage: '2',
          date: vi.getMockedSystemTime()?.valueOf(),
          state: 'INIT',
        },
      })
    })

    expect(result.current.interrogation.data).toMatchObject({
      CALCULATED: {},
      COLLECTED: { Q1: { COLLECTED: 'new data' } },
      EXTERNAL: {},
    })
  })

  describe('multimode', () => {
    const getArticulationState: () => LunaticGetArticulationState = () => ({
      items: [],
    })

    beforeAll(() => {
      // mock env var enabling multimode
      import.meta.env.VITE_MULTIMODE_ENABLED = 'true'
    })

    test('sets multimode state when a key is true', () => {
      const getMultimode: LunaticGetMultimode = () => ({
        IS_MOVED: true,
        IS_SPLIT: false,
      })
      const { result } = renderHook(() =>
        useInterrogation(
          { id: 'id', questionnaireId: 'qid', data: {} },
          { getMultimode, getArticulationState },
        ),
      )

      act(() => {
        const res = result.current.updateInterrogation(
          { COLLECTED: { Q1: { COLLECTED: 'new data' } } },
          '1',
        )
        expect(res.stateData?.multimode).toMatchObject({
          state: 'IS_MOVED',
          date: vi.getMockedSystemTime()?.valueOf(),
        })
      })
    })

    test('keeps multimode undefined when all keys are false', () => {
      const getMultimode: LunaticGetMultimode = () => ({
        IS_MOVED: false,
        IS_SPLIT: false,
      })
      const { result } = renderHook(() =>
        useInterrogation(
          { id: 'id', questionnaireId: 'qid', data: {} },
          { getMultimode, getArticulationState },
        ),
      )

      act(() => {
        const res = result.current.updateInterrogation(
          { COLLECTED: { Q1: { COLLECTED: 'new data' } } },
          '1',
        )
        expect(res.stateData?.multimode).toBeUndefined()
      })
    })

    test('does not update multimode if state has not changed', () => {
      const getMultimode: LunaticGetMultimode = () => ({
        IS_MOVED: true,
        IS_SPLIT: false,
      })
      const initialMultimode: StateData['multimode'] = {
        state: 'IS_MOVED',
        date: 123456,
      }
      const { result } = renderHook(() =>
        useInterrogation(
          {
            id: 'id',
            questionnaireId: 'qid',
            data: {},
            stateData: {
              state: 'INIT',
              date: 123,
              currentPage: '1',
              multimode: initialMultimode,
            },
          },
          { getMultimode, getArticulationState },
        ),
      )

      act(() => {
        const res = result.current.updateInterrogation(
          { COLLECTED: { Q1: { COLLECTED: 'new data' } } },
          '2',
        )
        // multimode should stay the same because state did not change
        expect(res.stateData?.multimode).toBe(initialMultimode)
      })
    })

    test('updates multimode when state changes to a different key', () => {
      const getMultimode: LunaticGetMultimode = () => ({
        IS_MOVED: false,
        IS_SPLIT: true,
      })
      const initialMultimode: StateData['multimode'] = {
        state: 'IS_MOVED',
        date: 123456,
      }
      const { result } = renderHook(() =>
        useInterrogation(
          {
            id: 'id',
            questionnaireId: 'qid',
            data: {},
            stateData: {
              state: 'INIT',
              date: 123,
              currentPage: '1',
              multimode: initialMultimode,
            },
          },
          { getMultimode, getArticulationState },
        ),
      )

      act(() => {
        const res = result.current.updateInterrogation(
          { COLLECTED: { Q1: { COLLECTED: 'new data' } } },
          '2',
        )
        expect(res.stateData?.multimode).toMatchObject({
          state: 'IS_SPLIT',
          date: vi.getMockedSystemTime()?.valueOf(),
        })
      })
    })
  })
})
