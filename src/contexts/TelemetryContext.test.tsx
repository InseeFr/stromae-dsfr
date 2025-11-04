import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react'

import { computeInitEvent } from '@/utils/telemetry'

import { TelemetryContext, useTelemetry } from './TelemetryContext'

describe('Telemetry context', () => {
  test('push events', () => {
    const mock = vi.fn()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TelemetryContext.Provider
        value={{
          isTelemetryEnabled: true,
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
          isTelemetryEnabled: true,
          pushEvent: () => {},
          setDefaultValues: mock,
        }}
      >
        {children}
      </TelemetryContext.Provider>
    )

    const { result } = renderHook(() => useTelemetry(), { wrapper })

    const myValues = { idInterrogation: 'abc' }
    result.current.setDefaultValues(myValues)

    expect(mock).toHaveBeenCalledWith(myValues)
  })
})
