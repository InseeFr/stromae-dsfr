//TODO: move this
export type SupportedLanguage = 'en' | 'fr' | 'sq'

export type LocalizedString =
  | string
  | Partial<Record<SupportedLanguage, string>>

export type Logo = {
  label: LocalizedString
  url: string
}

export type Content = {
  type: 'paragraph' | 'list'
  textItems: string[]
}

export type Contents = { title?: string; contentBlocks: Content[] }
export type Metadata = {
  label: LocalizedString
  objectives: LocalizedString
  mainLogo: Logo
  secondariesLogo?: Logo[]
  campaignInfo?: Contents[]
  interrogationInfo?: Contents[]
}
