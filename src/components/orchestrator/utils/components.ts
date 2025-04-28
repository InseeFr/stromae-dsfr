import type { LunaticComponentProps } from '@inseefr/lunatic'

import type { LunaticComponentsProps } from '@/models/lunaticType'

export function computeLunaticComponents(
  lunaticComponents: LunaticComponentProps[],
  pagination: 'sequence' | 'question' | undefined,
): {
  components: LunaticComponentsProps
  bottomComponents: LunaticComponentsProps
} {
  return lunaticComponents.reduce<{
    components: LunaticComponentsProps
    bottomComponents: LunaticComponentsProps
  }>(
    (acc, c) => {
      // In sequence pagination we do not want to display Sequence components
      if (pagination === 'sequence' && c.componentType === 'Sequence') {
        return acc // Skip this component
      }

      // We want to be able to display at the bottom components with position "bottom"
      // But position is not defined in lunatic components type
      if ('position' in c && c.position === 'bottom') {
        return {
          components: acc.components,
          bottomComponents: [...acc.bottomComponents, c],
        }
      }

      return {
        components: [...acc.components, c],
        bottomComponents: acc.bottomComponents,
      }
    },
    { components: [], bottomComponents: [] },
  )
}
