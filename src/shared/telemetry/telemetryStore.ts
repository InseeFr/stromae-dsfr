import type {
  LunaticControls,
  LunaticPageTag,
} from 'shared/components/Orchestrator/utils/lunaticType'

type TelemetryStore = {
  pageTag: LunaticPageTag
  controls: LunaticControls
}

let state = null as null | TelemetryStore

export const notifyTelemetry = (newState: TelemetryStore) => {
  if (state?.pageTag !== newState.pageTag) {
    document.dispatchEvent(
      new CustomEvent('lunatic-page-change', {
        detail: { page: newState.pageTag },
      })
    )
  }
  state = newState
}
