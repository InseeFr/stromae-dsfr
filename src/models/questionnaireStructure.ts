export type QuestionnaireComponent = {
  id?: string
  componentType?: string
  label?: {
    value?: string
  }
  components?: QuestionnaireComponent[]
}

export type SubSequenceItem = {
  id: string
  label: string
}

export type SequenceItem = {
  id: string
  label: string
  subSequences: SubSequenceItem[]
}
