import type { LunaticError } from '@inseefr/lunatic'

import { areArraysEqual } from '@/utils/compareArray'

export function isBlockingError(errors: Record<string, LunaticError[]>) {
  return Object.values(errors).some((errorArray) =>
    errorArray.some(
      (error) =>
        error.typeOfControl === 'FORMAT' || error.criticality === 'ERROR',
    ),
  )
}

export function isSameErrors(
  currentErrors: Record<string, LunaticError[]>,
  errors: Record<string, LunaticError[]> | undefined,
) {
  if (!errors) {
    //currentErrors can not be undefined (currentErrors is undefined when no error)
    return false
  }

  // extract errors Id in an arrays to compare them easily
  const extractErrorsIds = (rawErrors: Record<string, LunaticError[]>) => {
    return Object.values(rawErrors).reduce(
      (acc, val) => acc.concat(val.map((error) => error.id)),
      [] as string[],
    )
  }

  const currentErrorsIds = extractErrorsIds(currentErrors)
  const errorsIds = extractErrorsIds(errors)

  return areArraysEqual(currentErrorsIds, errorsIds)
}
