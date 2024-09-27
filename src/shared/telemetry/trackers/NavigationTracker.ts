import type { createRouter } from '@tanstack/react-router'
import type { TelemetryCollector } from '../type'

export function addNavigationTracker(
  collector: TelemetryCollector,
  router: ReturnType<typeof createRouter>
) {
  router.subscribe('onResolved', (evt) => {
    collector.startSpan({
      name: 'navigation-change',
      attributes: {
        'router.from': evt.fromLocation.pathname,
        'router.to': evt.toLocation.pathname,
        'router.pathChanged': evt.pathChanged,
      },
    })
    collector.pushEvent({
      name: 'navigation-started',
    })
  })

  window.addEventListener('beforeunload', () => {
    collector.pushEvent({ name: 'navigation-exit' })
    collector.endSpan()
  })
}
