import type { TelemetryCollector, TelemetryEvent } from 'shared/telemetry/type'

export const consoleTelemetry = {
  startSpan(span: TelemetryEvent) {
    console.log('starting span', span)
  },
  pushEvent(event: TelemetryEvent) {
    console.log('event', event)
  },
  endSpan() {
    console.log('ending span')
  },
} satisfies TelemetryCollector
