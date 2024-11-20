/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { addParadata } from '@/api/07-paradata-events'
import { useBatch } from '@/hooks/useBatch'
import type {
  DefaultParadataValues,
  TelemetryEvent,
  TelemetryParadata,
} from '@/models/telemetry'

type TelemetryContextType = {
  isTelemetryDisabled: boolean
  pushEvent: (e: TelemetryParadata) => void | Promise<boolean>
  setDefaultValues: (e: DefaultParadataValues) => void
  triggerBatchTelemetryCallback?: () => Promise<void>
}

/** Mandatory values used as a context's last-resort fallback */
const defaultValues = {
  isTelemetryDisabled: true,
  pushEvent: (_: TelemetryParadata) => {},
  setDefaultValues: (_: DefaultParadataValues) => {},
}

/**
 * Exposes shared functions to handle telemetry events.
 *
 * Should be used with the useBatch hook to reduce external API load.
 */
export const TelemetryContext: React.Context<TelemetryContextType> =
  createContext(defaultValues)

/**
 * Returns the current telemetry context value.
 *
 * @version 1.2.4
 * @see https://react.dev/reference/react/useContext
 */
export function useTelemetry() {
  return useContext(TelemetryContext)
}

/** Initializes the telemetry context with a batch system */
export function TelemetryProvider({
  children,
}: Readonly<{
  children: React.ReactElement
}>) {
  const isTelemetryDisabled = import.meta.env.VITE_TELEMETRY_DISABLED === 'true'

  const [defaultValues, setDefaultValues] = useState<DefaultParadataValues>({
    userAgent: navigator.userAgent,
  })

  /** Push events to telemetry API after an arbitrary number of events or a delay. */
  const pushEvents = useCallback(async (events: Array<TelemetryEvent>) => {
    if (events.length > 0) {
      return addParadata({ idSU: events[0].idSU, events })
    }
  }, [])

  const { addDatum, triggerTimeoutEvent } = useBatch(pushEvents)

  /** Add the event to a batch mechanism. */
  const pushEvent = useCallback(
    (event: TelemetryParadata) => {
      addDatum({ ...defaultValues, ...event })
    },
    [addDatum, defaultValues],
  )

  /** Add values that will be appended to every telemetry event (e.g. user id) */
  const updateDefaultValues = useCallback(
    (newDefaultValues: DefaultParadataValues) => {
      setDefaultValues((oldValues: DefaultParadataValues) => ({
        ...oldValues,
        ...newDefaultValues,
      }))
    },
    [],
  )

  const telemetryContextValues = useMemo(
    () => ({
      isTelemetryDisabled,
      pushEvent,
      setDefaultValues: updateDefaultValues,
      triggerBatchTelemetryCallback: triggerTimeoutEvent,
    }),
    [isTelemetryDisabled, pushEvent, triggerTimeoutEvent, updateDefaultValues],
  )

  return (
    <TelemetryContext.Provider value={telemetryContextValues}>
      {children}
    </TelemetryContext.Provider>
  )
}
