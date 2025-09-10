import type { ArticulationStateItems } from '@/models/lunaticType'

/** Convert articulation items to a CSV string */
export function articulationToCsv(
  articulationStateItems: ArticulationStateItems,
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
    (k) => k !== 'cells',
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

  // change label for progress values
  const progressLabel = (n: number) => {
    if (n === -1) return 'Commencer'
    if (n === 0) return 'Continuer'
    return 'Complété'
  }

  // Build rows
  const rows = articulationStateItems.map((item) => {
    const cellMap = new Map(item.cells.map((c) => [c.label, c.value]))

    const extraValues = extraHeaders.map((key) => {
      let value = (item as any)[key]
      if (key === 'progress' && typeof value === 'number') {
        value = progressLabel(value)
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
