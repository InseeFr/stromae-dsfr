import { createElement } from 'react'

import { describe, expect, it } from 'vitest'

import { type OverviewItem, extractSequencesFromOverview } from './siteMap'

describe('extractSequencesFromOverview', () => {
  it('returns an empty array for an empty overview', () => {
    const result = extractSequencesFromOverview([])
    expect(result).toEqual([])
  })

  it('extracts a single sequence', () => {
    const overview: OverviewItem[] = [
      {
        id: 'seq1',
        label: 'Introduction',
        children: [],
      },
    ]

    const result = extractSequencesFromOverview(overview)

    expect(result).toEqual([
      {
        id: 'seq1',
        label: 'Introduction',
        subSequences: [],
      },
    ])
  })

  it('extracts subsequences located in the sequence children', () => {
    const overview: OverviewItem[] = [
      {
        id: 'seq1',
        label: 'Main Sequence',
        children: [
          {
            id: 'sub1',
            label: 'Subsequence',
            children: [],
          },
        ],
      },
    ]

    const result = extractSequencesFromOverview(overview)

    expect(result).toHaveLength(1)
    expect(result[0].subSequences).toHaveLength(1)
    expect(result[0].subSequences[0]).toEqual({
      id: 'sub1',
      label: 'Subsequence',
    })
  })

  it('keeps React elements as labels', () => {
    const label = createElement('span', null, 'Sub with markup')

    const overview: OverviewItem[] = [
      {
        id: 'seq1',
        label: 'Main Sequence',
        children: [
          {
            id: 'sub1',
            label,
            children: [],
          },
        ],
      },
    ]

    const result = extractSequencesFromOverview(overview)

    expect(result[0].subSequences[0].label).toBe(label)
  })

  it('extracts multiple sequences with their own subsequences', () => {
    const overview: OverviewItem[] = [
      {
        id: 'seq1',
        label: 'First',
        children: [
          {
            id: 'sub1',
            label: 'Subsequenqce of First',
            children: [],
          },
        ],
      },
      {
        id: 'seq2',
        label: 'Second',
        children: [
          {
            id: 'sub2',
            label: 'Subsequence of Second',
            children: [],
          },
        ],
      },
    ]

    const result = extractSequencesFromOverview(overview)

    expect(result).toHaveLength(2)
    expect(result[0].subSequences).toHaveLength(1)
    expect(result[0].subSequences[0].label).toBe('Subsequenqce of First')
    expect(result[1].subSequences).toHaveLength(1)
    expect(result[1].subSequences[0].label).toBe('Subsequence of Second')
  })
})
