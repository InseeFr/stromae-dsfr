import { useSyncExternalStore } from 'react'

import { useIsDark } from '@codegouvfr/react-dsfr/useIsDark'

import { darkLogoInsee, logoInsee, metadataStore } from './metadataStore'

export const useMetadataStore = () => {
  const state = useSyncExternalStore(
    metadataStore.subscribe,
    metadataStore.getSnapshot,
  )

  const { isDark } = useIsDark()

  return {
    ...state,
    mainLogo: {
      ...state.mainLogo,
      url: isDark ? darkLogoInsee : logoInsee,
    },
  }

  return state
}
