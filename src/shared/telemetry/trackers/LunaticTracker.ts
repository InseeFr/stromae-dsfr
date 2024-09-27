import type { LunaticChangesHandler, LunaticPager } from '@inseefr/lunatic'
import type { StromaePage } from 'model/Page'
import type {
  LunaticControls,
  LunaticPageTag,
} from 'shared/components/Orchestrator/utils/lunaticType'
import type { TelemetryCollector } from '../type'

// To prevent sending too much event, keep the last change in memory
// If a subsequence change affect the same variable, remove the previous event
const previousChange = {
  name: '',
  timer: null as null | ReturnType<typeof setTimeout>,
}
const duration = 1_000
let telemetryCollector: null | TelemetryCollector = null

function addChangeTracker(collector: TelemetryCollector) {
  observer.current = (changes) => {
    for (const { name, value, iteration } of changes) {
      if (previousChange.name === name && previousChange.timer) {
        clearTimeout(previousChange.timer)
      }
      previousChange.name = name
      previousChange.timer = setTimeout(() => {
        collector.pushEvent({
          name: 'lunatic-change',
          attributes: {
            'response.name': name,
            'response.value': value,
            'response.iteration': iteration,
          },
        })
      }, duration)
    }
  }
}

type LunaticTelemetryState = {
  pager: LunaticPager | undefined
  pageTag: LunaticPageTag | StromaePage
  controls: LunaticControls | undefined
}
let previousState: LunaticTelemetryState | null = null

export const notifyTelemetry = (newState: LunaticTelemetryState) => {
  if (!telemetryCollector) {
    return
  }

  // Detect navigation
  if (previousState?.pageTag !== newState.pageTag) {
    telemetryCollector.startSpan({
      name: 'lunatic-page',
      attributes: {
        'lunatic.pageTag': newState.pageTag,
      },
    })
  }

  // Detect when there is an error
  if (newState.controls && previousState?.controls !== newState.controls) {
    telemetryCollector?.pushEvent({
      name: 'lunatic-error',
      attributes: {
        'lunatic.controls.id': Object.values(newState.controls).flatMap(
          (controls) => controls.map((control) => control.id)
        ),
      },
    })
  }

  previousState = newState
}

// Works as a "ref" to update the observer used withing the onChangeTracker
const observer = { current: (() => {}) as LunaticChangesHandler }

/**
 * Change tracker sent to lunatic via "onChange", allows the telemetry to hook itself on variable change
 */
export const onChangeTracker: LunaticChangesHandler = (changes) => {
  observer.current(changes)
}

export function addLunaticTracker(collector: TelemetryCollector) {
  telemetryCollector = collector
  addChangeTracker(collector)
}
