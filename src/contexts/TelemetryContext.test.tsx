import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react'

import { computeInitEvent } from '@/utils/telemetry'

import {
  TelemetryContext,
  computeIsTelemetryEnabled,
  useTelemetry,
} from './TelemetryContext'

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

describe('computing enabled flag', () => {
  it('should return false when all variable are not set', () => {
    import.meta.env.VITE_TELEMETRY_ENABLED = ''
    import.meta.env.VITE_TELEMETRY_DISABLED = ''
    expect(computeIsTelemetryEnabled()).toBeFalsy()
  })

  it('should return true when VITE_TELEMETRY_ENABLED is set to true', () => {
    import.meta.env.VITE_TELEMETRY_ENABLED = 'true'
    import.meta.env.VITE_TELEMETRY_DISABLED = ''
    expect(computeIsTelemetryEnabled()).toBeTruthy()
  })

  it('should return true when VITE_TELEMETRY_DISABLED is set to false', () => {
    import.meta.env.VITE_TELEMETRY_ENABLED = ''
    import.meta.env.VITE_TELEMETRY_DISABLED = 'false'
    expect(computeIsTelemetryEnabled()).toBeTruthy()
  })

  it('should return false when VITE_TELEMETRY_DISABLED is set to true', () => {
    import.meta.env.VITE_TELEMETRY_ENABLED = ''
    import.meta.env.VITE_TELEMETRY_DISABLED = 'true'
    expect(computeIsTelemetryEnabled()).toBeFalsy()
  })

  it('should return false when VITE_TELEMETRY_ENABLED & VITE_TELEMETRY_DISABLED are both set', () => {
    import.meta.env.VITE_TELEMETRY_ENABLED = 'false'
    import.meta.env.VITE_TELEMETRY_DISABLED = 'true'
    expect(computeIsTelemetryEnabled()).toBeFalsy()
  })

  it('should return true when VITE_TELEMETRY_ENABLED & VITE_TELEMETRY_DISABLED are both set', () => {
    import.meta.env.VITE_TELEMETRY_ENABLED = 'true'
    import.meta.env.VITE_TELEMETRY_DISABLED = 'true'
    expect(computeIsTelemetryEnabled()).toBeTruthy()
  })
})
