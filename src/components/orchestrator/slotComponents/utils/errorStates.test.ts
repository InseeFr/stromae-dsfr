import { describe, expect, it } from 'vitest'

import { getErrorStates } from './errorStates'

describe('getErrorStates', () => {
  it('return most critical first', () => {
    expect(
      getErrorStates([
        { id: 'id1', criticality: 'INFO', errorMessage: 'info' },
        { id: 'id2', criticality: 'ERROR', errorMessage: 'error' },
        { id: 'id3', criticality: 'WARN', errorMessage: 'warn' },
      ]),
    ).toStrictEqual({ state: 'error', stateRelatedMessage: 'error' })
    expect(
      getErrorStates([
        { id: 'id1', criticality: 'INFO', errorMessage: 'info' },
        { id: 'id2', criticality: 'INFO', errorMessage: 'info' },
        { id: 'id3', criticality: 'WARN', errorMessage: 'warn' },
      ]),
    ).toStrictEqual({ state: 'error', stateRelatedMessage: 'warn' })
    expect(
      getErrorStates([
        { id: 'id1', criticality: 'INFO', errorMessage: 'info' },
        { id: 'id2', criticality: 'INFO', errorMessage: 'info' },
        { id: 'id3', criticality: 'INFO', errorMessage: 'info' },
      ]),
    ).toStrictEqual({ state: 'success', stateRelatedMessage: 'info' })
  })
})
