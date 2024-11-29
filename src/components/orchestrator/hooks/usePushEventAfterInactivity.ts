import { useEffect, useRef, useState } from 'react'

import type { CommonParadata, InputParadata } from '@/models/telemetry'
import { areInputParadataIdentical } from '@/utils/telemetry'

const defaultInactivityDelay = 1_000

/**
 * Hook used to send a telemetry event only after a set inactivity time (1sec).
 * It is useful to not send a bunch of redundant events while the user is still
 * typing its answer.
 */
export function usePushEventAfterInactivity(
  pushEventAfterInactivity: (e: InputParadata & CommonParadata) => void,
  inactivityDelay: number = defaultInactivityDelay,
) {
  const [event, setEvent] = useState<
    (InputParadata & CommonParadata) | undefined
  >(undefined)
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const previousEventRef = useRef<(InputParadata & CommonParadata) | undefined>(
    undefined,
  )

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        if (previousEventRef.current)
          pushEventAfterInactivity(previousEventRef.current)
      }
    }
  }, [pushEventAfterInactivity])

  useEffect(() => {
    if (event) {
      clearTimeout(timerRef.current)
      if (
        previousEventRef?.current &&
        !areInputParadataIdentical(event, previousEventRef?.current)
      ) {
        // new and existing in cache -> push event and put new in cache
        pushEventAfterInactivity(previousEventRef.current)
      }

      // new and nothing in cache -> put new in cache
      // else: update -> update new in cache
      previousEventRef.current = event

      // update timer
      const timer = setTimeout(() => {
        if (previousEventRef.current) {
          pushEventAfterInactivity(previousEventRef.current)
          previousEventRef.current = undefined
        }
      }, inactivityDelay)
      timerRef.current = timer
    }
  }, [pushEventAfterInactivity, inactivityDelay, event])

  const triggerTimeoutEvent = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      if (previousEventRef.current) {
        pushEventAfterInactivity(previousEventRef.current)
        previousEventRef.current = undefined
      }
    }
  }

  return {
    triggerInactivityTimeoutEvent: triggerTimeoutEvent,
    setEventToPushAfterInactivity: setEvent,
  }
}
