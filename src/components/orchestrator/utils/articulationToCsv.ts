import type { LunaticArticulationStateItems } from '@/models/lunaticType'

type ExtraFields = Omit<LunaticArticulationStateItems[number], 'cells'>
type Progress = LunaticArticulationStateItems[number]['progress']

/** Convert articulation items to a CSV string */
export function articulationToCsv(
  articulationStateItems: LunaticArticulationStateItems,
): string {
  if (articulationStateItems.length === 0) return ''

  // Collect unique headers from all items' cells
  const cellHeaders = Array.from(
    new Set(
      articulationStateItems.flatMap((item) => item.cells.map((c) => c.label)),
    ),
  )

  // Collect the "fixed" keys from the first item (excluding 'cells')
  const extraHeaders = Object.keys(articulationStateItems[0]).filter(
    (k): k is keyof ExtraFields => k !== 'cells',
  )

  const headers = [...cellHeaders, ...extraHeaders]

  // Escape values for CSV
  const escapeCsv = (val: unknown): string => {
    if (val === null || val === undefined) return ''
    const str = String(val).replace(/"/g, '""') // escape quotes
    return str.includes(',') || str.includes('\n') || str.includes('"')
      ? `"${str}"`
      : str
  }

  // Map for progress states
  const progressLabels: Record<Progress, string> = {
    [-1]: 'Commencer',
    [0]: 'Continuer',
    [1]: 'Complété',
  }

  // Build rows
  const rows = articulationStateItems.map((item) => {
    const cellMap = new Map(item.cells.map((c) => [c.label, c.value]))

    const extraValues = extraHeaders.map((key) => {
      const value = item[key]
      if (key === 'progress') {
        // for progress we display a more readable label instead of its code value
        return escapeCsv(progressLabels[value as Progress])
      }
      return escapeCsv(value)
    })

    return [
      ...cellHeaders.map((h) => escapeCsv(cellMap.get(h))),
      ...extraValues,
    ].join(',')
  })

  return [headers.join(','), ...rows].join('\n')
}
