import { useState } from 'react'

/**
 * A hook that allows to retrieve the previous value of a value
 * @returns {T | null} returns the previous value or null if the value hasn't changed
 * @see {@link https://react-hooked.vercel.app/docs/usePrevious}
 */
export function usePrevious<T>(value: T): T | null {
  const [current, setCurrent] = useState(value)
  const [previous, setPrevious] = useState<null | T>(null)

  if (value !== current) {
    setPrevious(current)
    setCurrent(value)
  }

  return previous
}
