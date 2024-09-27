type AttributeValue =
  | string
  | number
  | undefined
  | boolean
  | Array<null | undefined | string>
  | Array<null | undefined | number>
  | Array<null | undefined | boolean>

export type TelemetryAttributes = Record<string, AttributeValue>

export type TelemetryEvent = {
  name: string
  attributes?: TelemetryAttributes
}

/**
 * A collector is responsible of collecting and sending telemetry data.
 * This instance will be sent to trackers
 */
export type TelemetryCollector = {
  startSpan: (span: TelemetryEvent) => void
  pushEvent: (event: TelemetryEvent) => void
  endSpan: () => void
}
