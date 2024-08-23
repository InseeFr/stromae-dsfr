import { ZoneContextManager } from '@opentelemetry/context-zone'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'
import { Resource } from '@opentelemetry/resources'
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  WebTracerProvider,
} from '@opentelemetry/sdk-trace-web'

import { type Span, trace } from '@opentelemetry/api'
import { W3CTraceContextPropagator } from '@opentelemetry/core'
import type { TelemetryCollector, TelemetryEvent } from './type'
/**
 * Initializes a WebTracerProvider with custom resource attributes for the Stromae-dsfr app.
 * The resource defines metadata such as service name, session ID, user agent, and browser language.
 */
const provider = new WebTracerProvider({
  resource: new Resource({
    // The package @opentelemetry/semantic-conventions is still under development.
    // When it's released, we should use constants (like service.name, etc.) from that package. I added the name of the constant in the package.
    'service.name': 'stromae-dsfr', //ATTR_SERVICE_NAME
    'session.id': crypto.randomUUID(), //ATTR_SESSION_ID
    'user_agent.original': navigator.userAgent, //ATTR_USER_AGENT_ORIGINAL
    'browser.language': navigator.language, //ATTR_BROWSER_LANGUAGE
  }),
})

const instrumentationScopeName = 'stromae-dsfr'
/**
 * A tracer instance for the Stromae-dsfr app.
 */
export const OpenTelemetry = (debug: boolean) => {
  const spanProcessor = debug
    ? new SimpleSpanProcessor(new ConsoleSpanExporter())
    : new BatchSpanProcessor(
        new OTLPTraceExporter({
          url: import.meta.env.VITE_OLTP_ENDPOINT_URL,
        })
      )
  provider.addSpanProcessor(spanProcessor)
  // Register the provider with the chosen context manager and propagator
  const contextManager = new ZoneContextManager()
  provider.register({
    contextManager: contextManager, // Enables context propagation through asynchronous operations
    propagator: new W3CTraceContextPropagator(), // Use W3C Trace Context for traceparent propagation to the api
  })

  let activeSpan: null | Span = null
  const tracer = trace.getTracer(instrumentationScopeName)

  return {
    startSpan(span: TelemetryEvent) {
      activeSpan?.end()
      activeSpan = tracer.startSpan(
        span.name,
        undefined,
        contextManager.active()
      )
      if (span.attributes) {
        activeSpan.setAttributes(span.attributes)
      }
    },
    pushEvent(event: TelemetryEvent) {
      if (!activeSpan) {
        throw new Error('Cannot send event outside of a span')
      }
      activeSpan = activeSpan.addEvent(event.name, event.attributes)
    },
    endSpan() {
      activeSpan?.end()
    },
  } satisfies TelemetryCollector
}
