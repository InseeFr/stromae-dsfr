export type TelemetryEvent = {
  type: string
  date: string // ISO 8601
  idSU: string
  userAgent: string // Navigator.userAgent
}

export type PageParadata = {
  page: string
  pageTag: string
}

export type ClickParadata = {
  element: string
}
