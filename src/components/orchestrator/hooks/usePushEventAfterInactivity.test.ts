import { act, renderHook } from '@testing-library/react'

import { computeInputEvent } from '@/utils/telemetry'

import { usePushEventAfterInactivity } from './usePushEventAfterInactivity'

describe('Use push event after inactivity', () => {
  test('push event after an inactive time', async () => {
    const mock = vi.fn()

    const { result } = renderHook(() => usePushEventAfterInactivity(mock, 50))

    expect(mock).not.toHaveBeenCalled()

    act(() =>
      result.current.setEventToPushAfterInactivity(
        computeInputEvent({ name: 'my-input' }),
      ),
    )

    expect(mock).not.toHaveBeenCalled()

    await new Promise((r) => setTimeout(r, 60))

    expect(mock).toHaveBeenCalledOnce()
    expect(mock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'my-input',
      }),
    )
  })

  test('updates event when within inactive time', async () => {
    const mock = vi.fn()

    const { result } = renderHook(() => usePushEventAfterInactivity(mock, 30))

    expect(mock).not.toHaveBeenCalled()

    act(() =>
      result.current.setEventToPushAfterInactivity(
        computeInputEvent({ name: 'my-input' }),
      ),
    )

    expect(mock).not.toHaveBeenCalled()

    act(() =>
      result.current.setEventToPushAfterInactivity(
        computeInputEvent({ name: 'my-input' }),
      ),
    )

    await new Promise((r) => setTimeout(r, 50))

    expect(mock).toHaveBeenCalledOnce()
    expect(mock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'my-input',
      }),
    )
  })

  test('sends event when it receives another input', async () => {
    const mock = vi.fn()

    const { result } = renderHook(() => usePushEventAfterInactivity(mock, 50))

    expect(mock).not.toHaveBeenCalled()

    act(() =>
      result.current.setEventToPushAfterInactivity(
        computeInputEvent({ name: 'my-input' }),
      ),
    )

    expect(mock).not.toHaveBeenCalled()

    act(() =>
      result.current.setEventToPushAfterInactivity(
        computeInputEvent({ name: 'my-input-2' }),
      ),
    )

    expect(mock).toHaveBeenCalledOnce()
    expect(mock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'my-input',
      }),
    )

    await new Promise((r) => setTimeout(r, 60))

    expect(mock).toHaveBeenCalledTimes(2)
    expect(mock).toHaveBeenLastCalledWith(
      expect.objectContaining({
        name: 'my-input-2',
      }),
    )
  })

  test('force push event', async () => {
    const mock = vi.fn()

    const { result } = renderHook(() => usePushEventAfterInactivity(mock))

    expect(mock).not.toHaveBeenCalled()

    act(() =>
      result.current.setEventToPushAfterInactivity(
        computeInputEvent({ name: 'my-input' }),
      ),
    )

    expect(mock).not.toHaveBeenCalled()

    result.current.triggerInactivityTimeoutEvent()

    expect(mock).toHaveBeenCalledOnce()
    expect(mock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'my-input',
      }),
    )
  })
})
