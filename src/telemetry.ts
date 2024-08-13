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

export const setupTelemetry = async (exporter: 'console' | 'otpl') => {
  const provider = new WebTracerProvider({
    resource: new Resource({ 'service.name': 'Stromae-dsfr' }),
  })

  // we will use ConsoleSpanExporter to check the generated spans in dev console
  //provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()))
  exporter === 'otpl' &&
    provider.addSpanProcessor(
      new BatchSpanProcessor(
        new OTLPTraceExporter({
          url: 'https://collector.demo.insee.io/v1/traces',
        })
      )
    )
  exporter === 'console' &&
    provider.addSpanProcessor(
      new SimpleSpanProcessor(new ConsoleSpanExporter())
    )

  provider.register({
    // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
    contextManager: new ZoneContextManager(),
  })

  registerInstrumentations({
    instrumentations: [
      // getWebAutoInstrumentations initializes all the package.
      // it's possible to configure each instrumentation if needed.
      getWebAutoInstrumentations({
        '@opentelemetry/instrumentation-fetch': {
          // config can be added here for example
          // we can initialize the instrumentation only for prod
          // enabled: import.meta.env.PROD,
        },
      }),
    ],
  })
}
