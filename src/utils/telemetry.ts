import { TELEMETRY_EVENT_TYPE } from '@/consts/telemetry'
import type {
  ControlParadata,
  InputParadata,
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

// computeInputEvent creates an event to be used by telemetry context when the
// user inputs something in lunatic components
export function computeInputEvent({
  idSU,
  inputs,
}: {
  idSU: string
  inputs: {
    name: any
    value: string
    iteration?: number[]
  }[]
}): TelemetryEvent & InputParadata {
  return {
    ...getDefaultData(),
    idSU,
    inputs,
    type: TELEMETRY_EVENT_TYPE.INPUT,
  }
}

// computeControlEvent creates an event to be used by telemetry context when
// lunatic shows a control to the user
export function computeControlEvent({
  controlId,
  idSU,
}: {
  controlId: string
  idSU: string
}): TelemetryEvent & ControlParadata {
  return {
    ...getDefaultData(),
    idSU,
    controlId,
    type: TELEMETRY_EVENT_TYPE.CONTROL,
  }
}

// computeControlSkipEvent creates an event to be used by telemetry context when
// the user ignores the control shown by lunatic
export function computeControlSkipEvent({
  controlId,
  idSU,
}: {
  controlId: string
  idSU: string
}): TelemetryEvent & ControlParadata {
  return {
    ...getDefaultData(),
    idSU,
    controlId,
    type: TELEMETRY_EVENT_TYPE.CONTROL_SKIP,
  }
}
