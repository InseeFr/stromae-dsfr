import type { LunaticError } from '@inseefr/lunatic'

import { isBlockingError, isWarningError } from '@/utils/controls'

/** Type of error on an input that can be computed from the Lunatic controls. */
export enum ErrorType {
  /** Should prevent further navigation (e.g. mandatory variables, format). */
  BLOCKING,
  /** Should not prevent further navigation (e.g. seemingly invalid answer). */
  WARNING,
}

/**
 * Return the type of error that is the most critical from our controls.
 *
 * i.e. Blocking > Warning > nothing.
 */
export function computeErrorType(
  controls?: Record<string, LunaticError[]>,
): ErrorType | undefined {
  if (!controls) return undefined

  let isWarning = false
  for (const control of Object.values(controls)) {
    for (const error of control) {
      if (isBlockingError(error)) {
        return ErrorType.BLOCKING
      }
      if (isWarningError(error)) {
        isWarning = true
      }
    }
  }

  if (isWarning) {
    return ErrorType.WARNING
  }

  return undefined
}

export function isSameErrors(
  errorsA: Record<string, LunaticError[]>,
  errorsB: Record<string, LunaticError[]>,
) {
  const idsA = []
  const idsB = []

  for (const control of Object.values(errorsA)) {
    for (const error of control) {
      idsA.push(error.id)
    }
  }
  for (const control of Object.values(errorsB)) {
    for (const error of control) {
      idsB.push(error.id)
    }
  }

  return idsA.toString() === idsB.toString()
}
