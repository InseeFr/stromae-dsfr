import { useCallback, useEffect, useRef, useState } from 'react'

const defaultDataMaxLength = 10
const defaultInactivityDelay = 60_000

/** Execute a function on data after either a set delay or a set data length. */
export function useBatch(
  callback: (data: Array<any>) => Promise<void>,
  dataMaxLength: number = defaultDataMaxLength,
  inactivityDelay: number = defaultInactivityDelay,
) {
  const [data, setData] = useState<Array<any>>([])
  const dataRef = useRef<Array<any>>([])
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    dataRef.current = data
  }, [data])

  // trigger function after a set delay
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    const timer = setInterval(() => {
      if (dataRef.current && dataRef.current.length > 0) {
        callback(dataRef.current)
        setData([])
      }
    }, inactivityDelay)
    timerRef.current = timer
  }, [callback, inactivityDelay])

  // trigger function when the data is over the set data length
  useEffect(() => {
    if (data.length >= dataMaxLength) {
      callback(data)
      setData([])
    }
  }, [callback, data, dataMaxLength])

  const addDatum = useCallback(
    (e: any) => {
      setData((data) => [...data, e])
    },
    [setData],
  )

  const triggerTimeoutEvent: () => Promise<void> =
    useCallback(async (): Promise<void> => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        if (dataRef.current && dataRef.current.length > 0) {
          await callback(dataRef.current)
          setData([])
        }
      }
    }, [callback])

  return {
    addDatum,
    triggerTimeoutEvent,
  }
}
