import { useCallback, useEffect } from 'react'

/**
 * A React hook that listens for the `beforeunload` event.
 *
 * @param {boolean} enabled - A boolean or a function that returns a boolean. If the
 * function returns `false`, the event will be prevented.
 *
 * @see {@link https://react-hooked.vercel.app/docs/useBeforeUnload}
 */
export function useBeforeUnload(enabled: boolean | (() => boolean) = true) {
  const handler = useCallback(
    (event: BeforeUnloadEvent) => {
      const finalEnabled = typeof enabled === 'function' ? enabled() : true

      if (!finalEnabled) {
        return
      }

      event.preventDefault()
    },
    [enabled],
  )

  useEffect(() => {
    if (!enabled) {
      return
    }

    window.addEventListener('beforeunload', handler)

    return () => window.removeEventListener('beforeunload', handler)
  }, [enabled, handler])
}
