import type { LunaticComponentsProps } from './lunaticType'

export const isSequencePage = (components: LunaticComponentsProps) =>
  components.some((component) => component.componentType === 'Sequence')
