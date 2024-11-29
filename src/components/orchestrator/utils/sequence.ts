import type { LunaticComponentsProps } from '@/models/lunaticType'

export const isSequencePage = (components: LunaticComponentsProps) =>
  components.some((component) => component.componentType === 'Sequence')
