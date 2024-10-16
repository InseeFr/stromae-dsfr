import { TELEMETRY_EVENT_TYPE } from '@/consts/telemetry'
import type {
  ClickParadata,
  PageParadata,
  TelemetryEvent,
} from '@/types/telemetry'

function getDefaultData() {
  return {
    date: new Date().toISOString(),
    userAgent: navigator.userAgent,
  }
}

// computeInitEvent creates an event to be used by telemetry context when user
// starts the app
export function computeInitEvent({ idSU }: { idSU: string }): TelemetryEvent {
  return {
    ...getDefaultData(),
    idSU,
    type: TELEMETRY_EVENT_TYPE.INIT,
  }
}

// computeInitEvent creates an event to be used by telemetry context when user
// go to a new page
export function computeNewPageEvent({
  idSU,
  page,
  pageTag,
}: {
  idSU: string
  page: string
  pageTag: string
}): TelemetryEvent & PageParadata {
  return {
    ...getDefaultData(),
    idSU,
    page,
    pageTag,
    type: TELEMETRY_EVENT_TYPE.NEW_PAGE,
  }
}

export function computeClickEvent({
  idSU,
  element,
}: {
  idSU: string
  element: string
}): TelemetryEvent & ClickParadata {
  return {
    ...getDefaultData(),
    idSU,
    element,
    type: TELEMETRY_EVENT_TYPE.CLICK,
  }
}
