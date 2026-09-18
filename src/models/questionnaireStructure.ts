import type { ReactNode } from 'react'

export type SubSequenceItem = {
  id: string
  label: ReactNode
}

export type SequenceItem = {
  id: string
  label: ReactNode
  subSequences: SubSequenceItem[]
}
