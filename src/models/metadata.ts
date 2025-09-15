import type { LocalizedString } from '@/i18n'

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
