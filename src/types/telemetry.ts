export type TelemetryEvent = {
  type: string
  date: string // ISO 8601
  idSU: string
  userAgent: string
}

export type PageParadata = {
  page: string
  pageTag: string
}

export type InputParadata = {
  inputs: Input[]
}
export type Input = {
  value: any
  name: string
  iteration?: number[]
}

export type ControlParadata = {
  controlId: string
}
