import type { LunaticError } from '@inseefr/lunatic'

export function isBlockingError(errors: Record<string, LunaticError[]>) {
  return Object.values(errors).some((errorArray) =>
    errorArray.some(
      (error) =>
        error.typeOfControl === 'FORMAT' || error.criticality === 'ERROR',
    ),
  )
}
