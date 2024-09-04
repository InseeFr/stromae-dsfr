import type { TelemetryCollector } from '../type'

export function addTooltipTracker(collector: TelemetryCollector) {
  const listener = (e: Event) => {
    const target = e.target as HTMLElement

    if (target.hasAttribute('data-fr-js-tooltip')) {
      const spanName = `tooltip.show`
      collector.pushEvent({
        name: spanName,
        attributes: {
          'tooltip.innerText':
            target.previousElementSibling?.textContent ?? undefined,
          'tooltip.elementId': target.id,
          'tooltip.elementClass': target.className,
        },
      })
    }
  }
  document.documentElement.addEventListener('dsfr.show', listener, {
    capture: true,
  })
}
