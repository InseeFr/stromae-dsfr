import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { resources } from './locales/ressources'

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      convertDetectedLanguage: (lng) => lng.split('-')[0],
    },
    supportedLngs: ['fr', 'en'],
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18next
