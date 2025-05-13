import type { ReactNode } from 'react'

import type { LunaticError } from '@inseefr/lunatic'

import { isBlockingError, isWarningError } from '@/utils/controls'

/**
 * Determines the state of errors for a given component.
 * @param errors - Optional. An object containing errors keyed by component ID.
 * @returns An object representing the state of errors and an optional message related to the state.
 * @remarks
 * This function analyzes the provided errors to determine the state of errors
 * It categorizes errors into three states: "default", "error", and "success".
 * - "default": No errors found for the component.
 * - "error": Critical errors or warnings found for the component.
 * - "success": Non-critical informational errors found for the component.
 * If the provided errors are undefined the function returns the default state.
 * Only the first error of the highest criticality for the specified component is considered.
 */
export function getErrorStates(errors?: LunaticError[]): {
  state: 'default' | 'error' | 'success'
  stateRelatedMessage: ReactNode | undefined
} {
  if (!errors || errors.length === 0) {
    return { state: 'default', stateRelatedMessage: undefined }
  }

  let warningMessage: ReactNode | undefined
  let infoMessage: ReactNode | undefined
  for (const error of errors) {
    if (isBlockingError(error)) {
      return { state: 'error', stateRelatedMessage: error.errorMessage }
    }
    if (!warningMessage) {
      if (isWarningError(error)) {
        warningMessage = error.errorMessage
      } else infoMessage ??= error.errorMessage
    }
  }

  if (warningMessage) {
    return { state: 'error', stateRelatedMessage: warningMessage }
  }
  return { state: 'success', stateRelatedMessage: infoMessage }
}
