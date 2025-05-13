import type { LunaticError } from '@inseefr/lunatic'

export enum ErrorType {
  BLOCKING,
  WARNING,
}

function isBlockingError(error: LunaticError): boolean {
  return error.typeOfControl === 'FORMAT' || error.criticality === 'ERROR'
}
function isWarningError(error: LunaticError): boolean {
  return error.criticality === 'WARN'
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

/** Sort the errors to display the most critical error first. */
export function sortErrors(
  controls?: Record<string, LunaticError[]>,
): Record<string, LunaticError[]> | undefined {
  if (!controls) return undefined

  const sortedControls: Record<string, LunaticError[]> = {}

  for (const [id, control] of Object.entries(controls)) {
    const blockingErrors: LunaticError[] = []
    const warnErrors: LunaticError[] = []
    for (const error of control) {
      if (isBlockingError(error)) {
        blockingErrors.push(error)
      }
      if (isWarningError(error)) {
        warnErrors.push(error)
      }
    }
    const sortedErrors: LunaticError[] = [...blockingErrors, ...warnErrors]
    sortedControls[id] = sortedErrors
  }

  return sortedControls
}
