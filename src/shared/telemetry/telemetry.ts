import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web'
import { ZoneContextManager } from '@opentelemetry/context-zone'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { Resource } from '@opentelemetry/resources'
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  WebTracerProvider,
} from '@opentelemetry/sdk-trace-web'

import { type Span } from '@opentelemetry/api'
import { W3CTraceContextPropagator } from '@opentelemetry/core'
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

/**
 * A tracer instance for the Stromae-dsfr app.
 */
export const tracer = provider.getTracer('stromae-dsfr')

const handleTyping = createTypingHandler()

/**
 * Sets up telemetry for the Stromae-dsfr application.
 * It configures the trace exporter based on the provided type and registers instrumentations.
 *
 * @param {'console' | 'otpl'} exporter - The type of exporter to use. 'console' for ConsoleSpanExporter, 'otpl' for OTLPTraceExporter.
 * @returns {Promise<void>} A promise that resolves when the telemetry setup is complete.
 */
export const setupTelemetry = async (exporter: 'console' | 'otpl') => {
  const configureExporter = () => {
    switch (exporter) {
      case 'console':
        provider.addSpanProcessor(
          new SimpleSpanProcessor(new ConsoleSpanExporter())
        )
        break
      case 'otpl': {
        const batchSpanProcessor = new BatchSpanProcessor(
          new OTLPTraceExporter({
            url: import.meta.env.VITE_OLTP_ENDPOINT_URL,
          })
        )
        provider.addSpanProcessor(batchSpanProcessor)
        return batchSpanProcessor
      }
    }
  }

  const batchSpanProcessor = configureExporter()

  // Register the provider with the chosen context manager and propagator
  provider.register({
    contextManager: new ZoneContextManager(), // Enables context propagation through asynchronous operations
    propagator: new W3CTraceContextPropagator(), // Use W3C Trace Context for traceparent propagation to the api
  })

  // Register auto-instrumentations to automatically trace certain web activities
  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
      getWebAutoInstrumentations({
        '@opentelemetry/instrumentation-document-load': {
          enabled: false,
        },
        '@opentelemetry/instrumentation-xml-http-request': {
          propagateTraceHeaderCorsUrls: /.+/,
          enabled: true,
        },
        '@opentelemetry/instrumentation-user-interaction': {
          enabled: true,
          eventNames: ['input'],
          shouldPreventSpanCreation: (event, element, span) => {
            if (event === 'input' && element.tagName === 'INPUT') {
              const inputElement = element as HTMLInputElement
              return handleTyping(inputElement, span)
            }
            return true
          },
        },
      }),
    ],
  })

  // Create a session-ended span and flush spans on beforeunload
  window.addEventListener('beforeunload', () => {
    // Create a new span for session end
    const sessionEndSpan = tracer.startSpan('Session Ended')
    sessionEndSpan.addEvent('User session is ending')
    sessionEndSpan.end() // End the span to ensure it's captured

    // Force flush the spans if BatchSpanProcessor is used
    if (batchSpanProcessor) {
      batchSpanProcessor.forceFlush()
    }
  })
}

function createTypingHandler(delay: number = 1000) {
  // Map pour stocker les timers pour chaque input
  const typingTimers = new Map<HTMLInputElement, number>()

  const handleTypingCompletion = (
    inputElement: HTMLInputElement,
    span: Span
  ) => {
    // Créez une nouvelle span une fois que l'utilisateur a fini de taper

    const inputValue = inputElement.value
    console.log("L'utilisateur a fini de taper : ", inputValue)
    span.setAttribute('input.value', inputValue)

    // Terminer la span
    span.end()
    return false
  }

  return (inputElement: HTMLInputElement, span: Span) => {
    const currentTimer = typingTimers.get(inputElement)

    if (currentTimer) {
      clearTimeout(currentTimer)
    }

    const newTimer = window.setTimeout(
      () => handleTypingCompletion(inputElement, span),
      delay
    )

    typingTimers.set(inputElement, newTimer)
  }
}
