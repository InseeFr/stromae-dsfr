import logoInsee from 'assets/logo-insee.png'
import { getTranslation } from 'i18n'
import { declareComponentKeys } from 'i18nifty'
import type { Metadata } from 'model/Metadata'

const { t } = getTranslation('metadataDefaultState')
console.log('log label translated', t('label'), typeof t('label'))
const defaultState: Metadata = {
  label: t('label'),
  objectives: t('objectives'),
  surveyUnitIdentifier: t('surveyUnitIdentifier'),
  mainLogo: {
    label: t('mainLogo'),
    url: logoInsee,
  },
}

let state: Metadata = defaultState
const listeners: Set<() => void> = new Set()

export const metadataStore = {
  getSnapshot(): Metadata {
    return state
  },
  updateMetadata(newState: Partial<Metadata>) {
    const updatedState = Object.keys(newState).reduce(
      (acc, key) => {
        if (newState[key as keyof Metadata] !== undefined) {
          return { ...acc, [key]: newState[key as keyof Metadata] }
        }
        return acc
      },
      { ...state }
    )

    state = updatedState
    emitChange()
    return state
  },
  subscribe(listener: () => void): () => void {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}

function emitChange(): void {
  listeners.forEach((listener) => listener())
}

// Extracting the required keys
type RequiredKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K
}[keyof T]

type MetadataDefaultKeys = RequiredKeys<Metadata>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<MetadataDefaultKeys>()(
  'metadataDefaultState'
)

export type I18n = typeof i18n
