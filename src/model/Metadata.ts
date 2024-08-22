type Logo = {
  label: string
  url: string
}

export type Content = {
  type: 'paragraph' | 'list'
  textItems: string[]
}
export type Metadata = {
  label: string
  objectives: string
  mainLogo: Logo
  secondariesLogo?: Logo[]
  campaignInfo?: { title?: string; contentBlocks: Content[] }[]
  surveyUnitInfo?: { title?: string; contentBlocks: Content[] }[]
  surveyUnitIdentifier: string
}
