import type { LunaticError } from '@inseefr/lunatic'

export function isBlockingError(error: LunaticError): boolean {
  return error.typeOfControl === 'FORMAT' || error.criticality === 'ERROR'
}

export function isWarningError(error: LunaticError): boolean {
  return error.criticality === 'WARN'
}
