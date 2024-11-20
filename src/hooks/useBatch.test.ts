import { act, renderHook } from '@testing-library/react'

import { useBatch } from './useBatch'

describe('Use batch', () => {
  test('triggers after a set delay', async () => {
    const mock = vi.fn()
    const delay = 200

    const { result } = renderHook(() => useBatch(mock, 10, delay))

    expect(mock).not.toHaveBeenCalled()

    act(() => result.current.addDatum(1))
    act(() => result.current.addDatum(2))

    expect(mock).not.toHaveBeenCalled()

    await act(() => new Promise((r) => setTimeout(r, delay)))

    expect(mock).toHaveBeenCalledOnce()
    expect(mock).toHaveBeenCalledWith([1, 2])
  })

  test('triggers after a set array length', async () => {
    const mock = vi.fn()
    const maxLength = 3

    const { result } = renderHook(() => useBatch(mock, maxLength))

    expect(mock).not.toHaveBeenCalled()

    act(() => result.current.addDatum(1))
    act(() => result.current.addDatum(2))
    act(() => result.current.addDatum(3))

    expect(mock).toHaveBeenCalledOnce()
    expect(mock).toHaveBeenCalledWith([1, 2, 3])
  })

  test('manually triggers', async () => {
    const mock = vi.fn()

    const { result } = renderHook(() => useBatch(mock))

    expect(mock).not.toHaveBeenCalled()

    act(() => result.current.addDatum(1))
    act(() => result.current.addDatum(2))

    expect(mock).not.toHaveBeenCalled()

    act(() => result.current.triggerTimeoutEvent())

    expect(mock).toHaveBeenCalledOnce()
    expect(mock).toHaveBeenCalledWith([1, 2])
  })
})
