import type { GenericTranslations } from 'i18nifty'

//List the languages you with to support
export const languages = ['en', 'fr', 'sq'] as const

//If the user's browser language doesn't match any
//of the languages above specify the language to fallback to:
export const fallbackLanguage = 'fr'

export type Language = (typeof languages)[number]

export type ComponentKey =
  | import('@/components/layout/Footer').I18n
  | import('@/components/layout/Header').I18n
  | import('@/components/layout/AutoLogoutCountdown').I18n
  | import('@/components/error/ErrorComponent').I18n
  | import('@/components/orchestrator/customPages/EndPage').I18n
  | import('@/components/orchestrator/customPages/ValidationModal').I18n
  | import('@/components/orchestrator/customPages/ExitModal').I18n
  | import('@/components/orchestrator/customPages/ValidationPage').I18n
  | import('@/components/orchestrator/customPages/WelcomePage').I18n
  | import('@/components/orchestrator/customPages/WelcomeModal').I18n
  | import('@/components/orchestrator/SequenceHeader').I18n
  | import('@/components/orchestrator/SurveyContainer').I18n
  | import('@/components/orchestrator/vtlDevTools/VTLDevtools').I18n
  | import('@/pages/accessibility/AccessibilityPage').I18n
  | import('@/pages/legals/LegalsPage').I18n
  | import('@/pages/navigationAssistance/NavigationAssistancePage').I18n
  | import('@/pages/security/SecurityPage').I18n
  | import('@/pages/siteMap/SiteMapPage').I18n
  | import('@/pages/visualize/form/VisualizeForm').I18n
  | import('@/pages/visualize/form/SelectNomenclatures').I18n
  | import('@/components/error/errorNormalizer').I18n

export type Translations<L extends Language> = GenericTranslations<
  ComponentKey,
  Language,
  typeof fallbackLanguage,
  L
>
