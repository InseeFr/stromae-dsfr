import { useEffect } from 'react'

import { useEvent } from '@/utils/useEvent'

const actions = new Set<() => Promise<void> | void>()

export async function executePreLogoutActions() {
  for (const action of actions) {
    await action()
  }
}

export function useAddPreLogoutAction(
  action: () => Promise<void> | void,
): void {
  const stableAction = useEvent(action)
  useEffect(() => {
    actions.add(stableAction)
    return () => {
      actions.delete(stableAction)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
