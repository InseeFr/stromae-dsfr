import type { GenericTranslations } from 'i18nifty'

//List the languages you with to support
export const languages = ['en', 'fr', 'sq'] as const

//If the user's browser language doesn't match any
//of the languages above specify the language to fallback to:
export const fallbackLanguage = 'fr'

export type Language = (typeof languages)[number]

export type ComponentKey =
  | import('@/shared/components/Layout/Footer').I18n
  | import('@/shared/components/Layout/Header').I18n
  | import('@/shared/components/Layout/AutoLogoutCountdown').I18n
  | import('@/shared/components/Error/ErrorComponent').I18n
  | import('@/shared/components/Orchestrator/CustomPages/EndPage').I18n
  | import('@/shared/components/Orchestrator/CustomPages/ValidationModal').I18n
  | import('@/shared/components/Orchestrator/CustomPages/ValidationPage').I18n
  | import('@/shared/components/Orchestrator/CustomPages/WelcomePage').I18n
  | import('@/shared/components/Orchestrator/CustomPages/WelcomeModal').I18n
  | import('@/shared/components/Orchestrator/SequenceHeader').I18n
  | import('@/shared/components/Orchestrator/SurveyContainer').I18n
  | import('@/shared/components/Orchestrator/VTLDevTools/VTLDevtools').I18n
  | import('@/pages/Accessibility/AccessibilityPage').I18n
  | import('@/pages/Legals/LegalsPage').I18n
  | import('@/pages/NavigationAssistance/NavigationAssistancePage').I18n
  | import('@/pages/Security/SecurityPage').I18n
  | import('@/pages/SiteMap/SiteMapPage').I18n
  | import('@/pages/Visualize/Form/VisualizeForm').I18n
  | import('@/pages/Visualize/Form/SelectNomenclatures').I18n
  | import('@/shared/error/errorNormalizer').I18n

export type Translations<L extends Language> = GenericTranslations<
  ComponentKey,
  Language,
  typeof fallbackLanguage,
  L
>
