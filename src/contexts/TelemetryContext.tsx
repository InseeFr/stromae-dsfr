import type { TelemetryEvent } from '@/types/telemetry'
import { createContext, useContext } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
type TelemetryContextType = {
  pushEvent: (e: TelemetryEvent) => void
}
export const TelemetryContext: React.Context<TelemetryContextType> =
  createContext({
    pushEvent: (e: TelemetryEvent) => {
      console.log(e.type)
    },
  })

export function useTelemetry() {
  return useContext(TelemetryContext)
}
