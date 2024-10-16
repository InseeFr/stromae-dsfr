import { computeInitEvent } from '@/utils/telemetry'
import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react'
import { TelemetryContext, useTelemetry } from './TelemetryContext'

describe('Telemetry context', () => {
  test('push events', () => {
    const mock = vi.fn()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TelemetryContext.Provider
        value={{
          isTelemetryDisabled: false,
          pushEvent: mock,
          setDefaultValues: () => {},
        }}
      >
        {children}
      </TelemetryContext.Provider>
    )

    const { result } = renderHook(() => useTelemetry(), { wrapper })

    const myEvent = computeInitEvent()
    result.current.pushEvent(myEvent)

    expect(mock).toHaveBeenCalledWith(myEvent)
  })

  test('set default values', () => {
    const mock = vi.fn()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TelemetryContext.Provider
        value={{
          isTelemetryDisabled: false,
          pushEvent: () => {},
          setDefaultValues: mock,
        }}
      >
        {children}
      </TelemetryContext.Provider>
    )

    const { result } = renderHook(() => useTelemetry(), { wrapper })

    const myValues = { idSU: 'abc' }
    result.current.setDefaultValues(myValues)

    expect(mock).toHaveBeenCalledWith(myValues)
  })
})
