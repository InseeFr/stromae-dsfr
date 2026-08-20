import type {
  QuestionnaireComponent,
  SequenceItem,
} from '@/models/questionnaireStructure'

export function isQuestionnaireWithComponents(
  data: unknown,
): data is { components?: QuestionnaireComponent[] } {
  return typeof data === 'object' && data !== null && !Array.isArray(data)
}

function cleanLabel(label: string): string {
  return label
    .replace(/"/g, '')
    .replace(/\s*\|\|\s*/g, ' ')
    .trim()
}

export function extractSequences(
  components: QuestionnaireComponent[],
  parentSequence?: SequenceItem,
): SequenceItem[] {
  const sequences: SequenceItem[] = []
  let currentSequence: SequenceItem | undefined = parentSequence

  for (const component of components) {
    if (component.componentType === 'Sequence' && component.label?.value) {
      const cleanedLabel = cleanLabel(component.label.value)
      currentSequence = {
        id: component.id ?? cleanedLabel,
        label: cleanedLabel,
        subSequences: [],
      }
      sequences.push(currentSequence)
    } else if (
      component.componentType === 'Subsequence' &&
      component.label?.value &&
      currentSequence
    ) {
      const cleanedLabel = cleanLabel(component.label.value)
      currentSequence.subSequences.push({
        id: component.id ?? cleanedLabel,
        label: cleanedLabel,
      })
    }

    if (component.components) {
      const nested = extractSequences(component.components, currentSequence)
      sequences.push(...nested)
    }
  }

  return sequences
}
