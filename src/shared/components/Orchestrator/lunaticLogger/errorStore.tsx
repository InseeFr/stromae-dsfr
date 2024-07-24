import { VTLExpressionError } from '@inseefr/lunatic'
import { useSyncExternalStore } from 'react'
import type {
  ErrorMessage,
  LoggerMessage,
  LunaticPageTag,
} from 'shared/components/Orchestrator/utils/lunaticType'

let errors: (ErrorMessage & { id: string })[] = []
const listeners = new Set<() => void>()
const errorIds = new Set<string>() // Track error IDs

function getErrorId(error: ErrorMessage) {
  return error.error.expression
}
export const errorStore = {
  addError(error: ErrorMessage) {
    const errorId = getErrorId(error)
    if (errorIds.has(errorId)) {
      return // Skip duplicate errors
    }
    errors = [...errors, { ...error, id: errorId }]
    errorIds.add(errorId)
    emitChange()
  },

  clearErrors() {
    errors = []
    errorIds.clear()
    emitChange()
  },

  getErrors() {
    return errors
  },

  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}

export const useLoggerErrors = () => {
  const subscribe = (callback: () => void) => {
    return errorStore.subscribe(callback)
  }

  const getSnapshot = () => errorStore.getErrors()

  const errors = useSyncExternalStore(subscribe, getSnapshot)

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
