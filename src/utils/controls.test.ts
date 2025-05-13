import type { LunaticError } from '@inseefr/lunatic'

import { isBlockingError, isWarningError } from './controls'

test.each([
  [{ id: 'id', criticality: 'ERROR' } as LunaticError, true],
  [
    { id: 'id', criticality: 'INFO', typeOfControl: 'FORMAT' } as LunaticError,
    true,
  ],
  [{ id: 'id', criticality: 'WARN' } as LunaticError, false],
  [{ id: 'id', criticality: 'INFO' } as LunaticError, false],
])('is blocking error %o -> %o', (data, expected) => {
  expect(isBlockingError(data)).toBe(expected)
})

test.each([
  [{ id: 'id', criticality: 'ERROR' } as LunaticError, false],
  [{ id: 'id', criticality: 'WARN' } as LunaticError, true],
  [{ id: 'id', criticality: 'INFO' } as LunaticError, false],
])('is warning error %o -> %o', (data, expected) => {
  expect(isWarningError(data)).toBe(expected)
})
