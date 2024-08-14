import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web'
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
  console.log('setuptTelemetry')

  switch (exporter) {
    case 'console':
      provider.addSpanProcessor(
        new SimpleSpanProcessor(new ConsoleSpanExporter())
      )
      break
    case 'otpl':
      provider.addSpanProcessor(
        new BatchSpanProcessor(
          new OTLPTraceExporter({
            url: 'https://collector.demo.insee.io/v1/traces',
          })
        )
      )
      break
  }

  registerInstrumentations({
    tracerProvider: provider,
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
