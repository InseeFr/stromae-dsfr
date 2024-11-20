import { TELEMETRY_EVENT_TYPE } from '@/constants/telemetry'
import type {
  CommonParadata,
  ExitParadata,
  InputParadata,
  TelemetryParadata,
} from '@/models/telemetry'

function getCommonData(): CommonParadata {
  return {
    date: new Date().toISOString(),
  }
}

/** Creates an event to be used by telemetry context when the user starts the app */
export function computeInitEvent(): TelemetryParadata {
  return {
    ...getCommonData(),
    type: TELEMETRY_EVENT_TYPE.INIT,
  }
}

/** Creates an event to be used by telemetry context when the user quits the app */
export function computeExitEvent({
  source,
}: {
  source: ExitParadata['source']
}): TelemetryParadata {
  return {
    ...getCommonData(),
    source,
    type: TELEMETRY_EVENT_TYPE.EXIT,
  }
}

/** Creates an event to be used by telemetry context when the user goes to a new page  */
export function computeNewPageEvent({
  page,
  pageTag,
}: {
  page: string
  pageTag: string
}): TelemetryParadata {
  return {
    ...getCommonData(),
    page,
    pageTag,
    type: TELEMETRY_EVENT_TYPE.NEW_PAGE,
  }
}

/** Creates an event to be used by telemetry context when the user inputs something in lunatic components */
export function computeInputEvent({
  name,
  value,
  iteration,
}: {
  name: any
  value: string
  iteration?: number[]
}): InputParadata & CommonParadata {
  return {
    ...getCommonData(),
    name,
    value,
    iteration,
    type: TELEMETRY_EVENT_TYPE.INPUT,
  }
}

/** Creates an event to be used by telemetry context when lunatic shows a control to the user */
export function computeControlEvent({
  controlIds,
}: {
  controlIds: string[]
}): TelemetryParadata {
  return {
    ...getCommonData(),
    controlIds,
    type: TELEMETRY_EVENT_TYPE.CONTROL,
  }
}

/** Creates an event to be used by telemetry context when the user ignores the control shown by lunatic */
export function computeControlSkipEvent({
  controlIds,
}: {
  controlIds: string[]
}): TelemetryParadata {
  return {
    ...getCommonData(),
    controlIds,
    type: TELEMETRY_EVENT_TYPE.CONTROL_SKIP,
  }
}

/** Creates an event to be used by telemetry context when the user clicks on 'contact support' */
export function computeContactSupportEvent(): TelemetryParadata {
  return {
    ...getCommonData(),
    type: TELEMETRY_EVENT_TYPE.CONTACT_SUPPORT,
  }
}
