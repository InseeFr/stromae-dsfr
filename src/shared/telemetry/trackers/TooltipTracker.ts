import { TooltipTrackingInstrumentation } from '../instrumentations/TooltipTrackingInstrumentation'
import type { TelemetryCollector } from '../type'

export function addTooltipTracker(collector: TelemetryCollector) {
  const listener = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.hasAttribute(TooltipTrackingInstrumentation.dataAttribute)) {
      const spanName = `Tooltip Tracking - ${target.id || target.className}`
      collector.pushEvent({
        name: spanName,
        attributes: {
          'tooltip.innerText': target.innerText,
          'tooltip.elementId': target.id,
          'tooltip.elementClass': target.className,
          'tooltip.state': target.classList.contains('fr-tooltip--shown')
            ? 'visible'
            : 'hidden',
        },
      })
    }
  }
  document.addEventListener('mouseover', listener)
}
