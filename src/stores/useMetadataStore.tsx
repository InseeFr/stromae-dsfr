import { useSyncExternalStore } from 'react'
import { metadataStore } from './metadataStore'

export const useMetadataStore = () => {
  const state = useSyncExternalStore(
    metadataStore.subscribe,
    metadataStore.getSnapshot,
  )
  return state
}
