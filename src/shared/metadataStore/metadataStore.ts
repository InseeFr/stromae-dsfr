import logoInsee from '@/assets/logo-insee.png'
import type { Metadata } from '@/model/Metadata'

const defaultState: Metadata = {
  label: {
    fr: "Filière d'enquête",
    en: 'Survey Line',
    sq: 'Linja e Anketës',
  },
  objectives: {
    fr: 'Objectif court de votre enquête',
    en: 'Short objective of your survey',
    sq: 'Objektivi i shkurtër i anketës tuaj',
  },
  surveyUnitIdentifier: {
    fr: 'Application de collecte internet',
    en: 'Internet Collection Application',
    sq: 'Aplikacioni për Mbledhjen e të Dhënave në Internet',
  },
  mainLogo: {
    label: {
      fr: "Logo de l'insee",
      en: 'INSEE Logo',
      sq: 'Logoja e INSEE',
    },
    url: logoInsee,
  },
  campaignInfo: undefined,
  secondariesLogo: undefined,
  surveyUnitInfo: undefined,
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
        if (key in state && newState[key as keyof Metadata] !== undefined) {
          return { ...acc, [key]: newState[key as keyof Metadata] }
        }
        return acc
      },
      { ...state },
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
