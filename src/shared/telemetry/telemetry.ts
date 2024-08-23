import type { createRouter } from '@tanstack/react-router'
import { consoleTelemetry } from './ConsoleTelemetry'
import { OpenTelemetry } from './OpenTelemetry'
import { addLunaticTracker } from './trackers/LunaticTracker'
import { addNavigationTracker } from './trackers/NavigationTracker'
import { addTooltipTracker } from './trackers/TooltipTracker'

type Args = {
  exporter: 'console' | 'otpl'
  router: ReturnType<typeof createRouter>
}

export const setupTelemetry = ({ exporter, router }: Args) => {
  const collector =
    exporter === 'console' ? consoleTelemetry : OpenTelemetry(true)

  addTooltipTracker(collector)
  addNavigationTracker(collector, router)
  addLunaticTracker(collector)
}
