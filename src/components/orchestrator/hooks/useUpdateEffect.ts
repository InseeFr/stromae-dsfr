import { useEffect, useRef } from 'react'

function useFirstMountState(): boolean {
  const isFirstRef = useRef(true)

  if (isFirstRef.current) {
    isFirstRef.current = false
    return true
  }

  return isFirstRef.current
}

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState()

  useEffect(() => {
    if (!isFirstMount) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
