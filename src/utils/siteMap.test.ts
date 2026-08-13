import { describe, expect, it } from 'vitest'

import { extractSequences, isQuestionnaireWithComponents } from './siteMap'

describe('isQuestionnaireWithComponents', () => {
  it('returns true for an object', () => {
    const result = isQuestionnaireWithComponents({})
    expect(result).toBe(true)
  })

  it('returns true for an object with components', () => {
    const result = isQuestionnaireWithComponents({ components: [] })
    expect(result).toBe(true)
  })

  it('returns false for null', () => {
    const result = isQuestionnaireWithComponents(null)
    expect(result).toBe(false)
  })

  it('returns false for a string', () => {
    const result = isQuestionnaireWithComponents('test')
    expect(result).toBe(false)
  })

  it('returns false for a number', () => {
    const result = isQuestionnaireWithComponents(42)
    expect(result).toBe(false)
  })

  it('returns false for undefined', () => {
    const result = isQuestionnaireWithComponents(undefined)
    expect(result).toBe(false)
  })

  it('returns false for an array', () => {
    const result = isQuestionnaireWithComponents([])
    expect(result).toBe(false)
  })

  it('returns false for a function', () => {
    const result = isQuestionnaireWithComponents(() => {})
    expect(result).toBe(false)
  })
})

describe('extractSequences', () => {
  it('returns an empty array for an empty components list', () => {
    const result = extractSequences([])
    expect(result).toEqual([])
  })

  it('extracts a single sequence', () => {
    const components = [
      {
        id: 'seq1',
        componentType: 'Sequence',
        label: { value: 'Introduction' },
      },
    ]

    const result = extractSequences(components)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      id: 'seq1',
      label: 'Introduction',
      subSequences: [],
    })
  })

  it('cleans labels by removing quotes', () => {
    const components = [
      {
        id: 'seq1',
        componentType: 'Sequence',
        label: { value: '"Quoted Label"' },
      },
    ]

    const result = extractSequences(components)

    expect(result[0].label).toBe('Quoted Label')
  })

  it('cleans labels by replacing || with space', () => {
    const components = [
      {
        id: 'seq1',
        componentType: 'Sequence',
        label: { value: 'Part 1 || Part 2' },
      },
    ]

    const result = extractSequences(components)

    expect(result[0].label).toBe('Part 1 Part 2')
  })

  it('trims whitespace from labels', () => {
    const components = [
      {
        id: 'seq1',
        componentType: 'Sequence',
        label: { value: '  Spaced Label  ' },
      },
    ]

    const result = extractSequences(components)

    expect(result[0].label).toBe('Spaced Label')
  })

  it('uses label as id when id is missing', () => {
    const components = [
      {
        componentType: 'Sequence',
        label: { value: 'No Id Sequence' },
      },
    ]

    const result = extractSequences(components)

    expect(result[0].id).toBe('No Id Sequence')
  })

  it('ignores sequences without a label value', () => {
    const components = [
      {
        id: 'seq1',
        componentType: 'Sequence',
        label: {},
      },
    ]

    const result = extractSequences(components)

    expect(result).toHaveLength(0)
  })

  it('extracts subsequences attached to a sequence', () => {
    const components = [
      {
        id: 'seq1',
        componentType: 'Sequence',
        label: { value: 'Main Sequence' },
      },
      {
        id: 'sub1',
        componentType: 'Subsequence',
        label: { value: 'Sub Sequence' },
      },
    ]

    const result = extractSequences(components)

    expect(result).toHaveLength(1)
    expect(result[0].subSequences).toHaveLength(1)
    expect(result[0].subSequences[0]).toEqual({
      id: 'sub1',
      label: 'Sub Sequence',
    })
  })

  it('ignores subsequences when there is no current sequence', () => {
    const components = [
      {
        id: 'sub1',
        componentType: 'Subsequence',
        label: { value: 'Orphan Sub' },
      },
    ]

    const result = extractSequences(components)

    expect(result).toHaveLength(0)
  })

  it('ignores components that are neither Sequence nor Subsequence', () => {
    const components = [
      {
        id: 'seq1',
        componentType: 'Sequence',
        label: { value: 'Main' },
      },
      {
        id: 'q1',
        componentType: 'Question',
        label: { value: 'Question' },
      },
    ]

    const result = extractSequences(components)

    expect(result).toHaveLength(1)
    expect(result[0].label).toBe('Main')
  })

  it('extracts nested sequences from component.components', () => {
    const components = [
      {
        id: 'seq1',
        componentType: 'Sequence',
        label: { value: 'Sequence 1' },
        components: [
          {
            id: 'seq2',
            componentType: 'Sequence',
            label: { value: 'Sequence 2' },
          },
        ],
      },
    ]

    const result = extractSequences(components)

    expect(result).toHaveLength(2)
    expect(result[0].label).toBe('Sequence 1')
    expect(result[1].label).toBe('Sequence 2')
  })

  it('extracts subsequences from nested components', () => {
    const components = [
      {
        id: 'seq1',
        componentType: 'Sequence',
        label: { value: 'Sequence 1' },
        components: [
          {
            id: 'sub1',
            componentType: 'Subsequence',
            label: { value: 'Subsequence' },
          },
        ],
      },
    ]

    const result = extractSequences(components)

    expect(result).toHaveLength(1)
    expect(result[0].subSequences).toHaveLength(1)
    expect(result[0].subSequences[0].label).toBe('Subsequence')
  })

  it('handles deeply nested structures', () => {
    const components = [
      {
        id: 'seq1',
        componentType: 'Sequence',
        label: { value: 'Level 1' },
        components: [
          {
            id: 'seq2',
            componentType: 'Sequence',
            label: { value: 'Level 2' },
            components: [
              {
                id: 'seq3',
                componentType: 'Sequence',
                label: { value: 'Level 3' },
              },
            ],
          },
        ],
      },
    ]

    const result = extractSequences(components)

    expect(result).toHaveLength(3)
    expect(result[0].label).toBe('Level 1')
    expect(result[1].label).toBe('Level 2')
    expect(result[2].label).toBe('Level 3')
  })

  it('resets currentSequence when a new sequence appears after a subsequence', () => {
    const components = [
      {
        id: 'seq1',
        componentType: 'Sequence',
        label: { value: 'First' },
      },
      {
        id: 'sub1',
        componentType: 'Subsequence',
        label: { value: 'Sub of First' },
      },
      {
        id: 'seq2',
        componentType: 'Sequence',
        label: { value: 'Second' },
      },
      {
        id: 'sub2',
        componentType: 'Subsequence',
        label: { value: 'Sub of Second' },
      },
    ]

    const result = extractSequences(components)

    expect(result).toHaveLength(2)
    expect(result[0].subSequences).toHaveLength(1)
    expect(result[0].subSequences[0].label).toBe('Sub of First')
    expect(result[1].subSequences).toHaveLength(1)
    expect(result[1].subSequences[0].label).toBe('Sub of Second')
  })
})
