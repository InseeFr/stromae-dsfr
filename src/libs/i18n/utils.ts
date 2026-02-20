import i18n from 'i18next'

import type { LocalizedString, SupportedLanguage } from '@/models/metadata'

export const resolveLocalizedString = (
  str: LocalizedString | undefined,
): string => {
  if (!str) return ''

  if (typeof str === 'string') return str

  const currentLang = i18n.language as SupportedLanguage

  if (str[currentLang]) return str[currentLang]

  if (str['fr']) return str['fr']

  const firstValue = Object.values(str)[0]
  return firstValue || ''
}
