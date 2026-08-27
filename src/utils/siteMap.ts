import type { ReactNode } from 'react'

import type { SequenceItem } from '@/models/questionnaireStructure'

export type OverviewItem = {
  id: string
  label: ReactNode
  children: OverviewItem[]
}

export function extractSequencesFromOverview(
  overview: OverviewItem[],
): SequenceItem[] {
  return overview.map((item) => ({
    id: item.id,
    label: item.label,
    subSequences: item.children.map((child) => ({
      id: child.id,
      label: child.label,
    })),
  }))
}
