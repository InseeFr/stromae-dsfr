import { describe, expect, it } from 'vitest'

import type {
  ArticulationStateItems,
  LunaticPageTag,
} from '@/models/lunaticType'

import { articulationToCsv } from './articulationToCsv'

describe('articulationToCsv', () => {
  it('should return an empty string when items array is empty', () => {
    const result = articulationToCsv([])
    expect(result).toBe('')
  })

  it('should generate headers from cells + other properties', () => {
    const items: ArticulationStateItems = [
      {
        cells: [
          { label: 'Name', value: 'Alice' },
          { label: 'Age', value: 30 },
        ],
        progress: 1,
        page: '4.1#1' as LunaticPageTag,
      },
    ]

    const result = articulationToCsv(items)
    const [headerLine] = result.split('\n')

    expect(headerLine.split(',')).toEqual(['Name', 'Age', 'progress', 'page'])
  })

  it('should generate rows correctly', () => {
    const items: ArticulationStateItems = [
      {
        cells: [
          { label: 'Name', value: 'Alice' },
          { label: 'Age', value: 30 },
        ],
        progress: 1,
        page: '4.1#1' as LunaticPageTag,
      },
      {
        cells: [
          { label: 'Name', value: 'Patrick' },
          { label: 'Age', value: 25 },
        ],
        progress: 0,
        page: '4.1#2' as LunaticPageTag,
      },
    ]

    const result = articulationToCsv(items)
    const lines = result.split('\n')

    // First line is headers
    expect(lines[0]).toContain('Name')
    expect(lines[0]).toContain('Age')
    expect(lines[0]).toContain('progress')
    expect(lines[0]).toContain('page')

    // Second line is the first item row
    expect(lines[1]).toContain('Alice')
    expect(lines[1]).toContain('30')
    expect(lines[1]).toContain('Complété')
    expect(lines[1]).toContain('4.1#1')

    // Third line is the second item row
    expect(lines[2]).toContain('Patrick')
    expect(lines[2]).toContain('25')
    expect(lines[2]).toContain('Continuer')
    expect(lines[2]).toContain('4.1#2')
  })
})
