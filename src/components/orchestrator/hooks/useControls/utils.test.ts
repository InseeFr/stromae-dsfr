import { describe, expect, it } from 'vitest'

import { ErrorType, computeErrorType } from './utils'

describe('Compute error type', () => {
  it('returns blocking when there is at least one error', () => {
    expect(
      computeErrorType({
        Q1: [
          { id: 'id1', criticality: 'ERROR', errorMessage: 'blocking error' },
        ],
      }),
    ).toBe(ErrorType.BLOCKING)
    expect(
      computeErrorType({
        Q1: [{ id: 'id1', criticality: 'WARN', errorMessage: 'warning' }],
        Q2: [
          { id: 'id2', criticality: 'ERROR', errorMessage: 'blocking error' },
        ],
      }),
    ).toBe(ErrorType.BLOCKING)
  })

  it('returns warning when there is one warning and no error', () => {
    expect(
      computeErrorType({
        Q1: [{ id: 'id1', criticality: 'WARN', errorMessage: 'warning' }],
      }),
    ).toBe(ErrorType.WARNING)
  })

  it('returns nothing when there is no warning nor error', () => {
    expect(computeErrorType({ Q1: [] })).toBeUndefined()
    expect(
      computeErrorType({
        Q1: [{ id: 'id1', criticality: 'INFO', errorMessage: 'info' }],
      }),
    ).toBeUndefined()
    expect(computeErrorType()).toBeUndefined()
  })
})
