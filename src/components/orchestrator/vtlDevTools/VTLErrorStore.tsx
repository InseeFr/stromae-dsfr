import { useSyncExternalStore } from 'react'

import { VTLExpressionError } from '@inseefr/lunatic'

import type {
  ErrorMessage,
  LoggerMessage,
  LunaticPageTag,
} from '@/components/orchestrator/utils/lunaticType'

function getErrorId(error: ErrorMessage) {
  return error.error.expression
}
const createErrorStore = () => {
  let errors: (ErrorMessage & { id: string })[] = []
  const listeners = new Set<() => void>()
  const errorIds = new Set<string>()

  function addError(error: ErrorMessage) {
    const errorId = getErrorId(error)
    if (errorIds.has(errorId)) {
      return // Skip duplicate errors
    }
    errors = [...errors, { ...error, id: errorId }]
    errorIds.add(errorId)
    emitChange()
  }

  function clearErrors() {
    errors = []
    errorIds.clear()
    emitChange()
  }

  function getErrors() {
    return errors
  }

  function subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  function emitChange() {
    for (const listener of listeners) {
      listener()
    }
  }

  return {
    addError,
    clearErrors,
    getErrors,
    subscribe,
  }
}

// errorStore is only used in visualize mode. We assume it is stored as a global variable, which may not be refreshed when changing the survey without reloading the page.
const errorStore = createErrorStore()

export const useLoggerErrors = () => {
  const errors = useSyncExternalStore(
    errorStore.subscribe,
    errorStore.getErrors,
  )

  const resetErrors = () => {
    errorStore.clearErrors()
  }

  return { errors, resetErrors }
}

type LoggerContext = {
  pageTag: { current: LunaticPageTag }
}

/**
 * Logger to use for "useLunatic"
 */
export const createLunaticLogger =
  (ctx: LoggerContext) => (msg: LoggerMessage) => {
    if (msg.type === 'ERROR' && msg.error instanceof VTLExpressionError) {
      errorStore.addError({
        pageTag: ctx.pageTag.current,
        error: msg.error,
      })
    }
  }
