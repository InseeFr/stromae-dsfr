import { TELEMETRY_EVENT_TYPE } from '@/constants/telemetry'
import type {
  CommonParadata,
  ExitParadata,
  InputParadata,
  TelemetryParadata,
} from '@/types/telemetry'

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
  iteration,
}: {
  name: any
  iteration?: number[]
}): InputParadata & CommonParadata {
  return {
    ...getCommonData(),
    name,
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

export function areInputParadataIdentical(
  event1: InputParadata,
  event2: InputParadata
): boolean {
  return (
    (event1.name === event2.name &&
      ((event1.iteration === undefined && event2.iteration === undefined) ||
        (event1.iteration &&
          event2.iteration &&
          areArraysEqual(event1.iteration, event2.iteration)))) ??
    false
  )
}

function areArraysEqual(array1: any[], array2: any[]): boolean {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  )
}
