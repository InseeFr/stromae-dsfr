import type { createRouter } from '@tanstack/react-router'
import { tracer } from './telemetry' // Assuming telemetry is initialized in this file

export function setupRouterTelemetry(router: ReturnType<typeof createRouter>) {
  // Subscribe to router events and handle span creation within the closures
  router.subscribe('onBeforeNavigate', (evt) => {
    console.log('onBeforeNavigate')
    // Use startActiveSpan to ensure that other spans use the same trace
    tracer.startActiveSpan(
      `Navigation from ${evt.fromLocation.pathname} to ${evt.toLocation.pathname}`,

      (span) => {
        span.addEvent('Navigation started')
        // Handle span completion in the onResolved event
        const unsubscribeResolved = router.subscribe('onResolved', () => {
          console.log('onResolved')

          span.addEvent('Navigation resolved')
          span.end()

          // Unsubscribe after resolving to prevent multiple calls
          unsubscribeResolved()
        })
      }
    )
  })
}
