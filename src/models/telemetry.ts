import type {
  TELEMETRY_EVENT_EXIT_SOURCE,
  TELEMETRY_EVENT_TYPE,
} from '@/constants/telemetry'

/** Object sent to telemetry API  */
export type TelemetryEvent = DefaultParadataValues &
  TelemetryParadata & {
    date: string // ISO 8601
  }

/** Values that are set up once and added to every telemetry event */
export type DefaultParadataValues = {
  idInterrogation?: string
  sid?: string
  userAgent?: string
}

/** Paradata values computed for every events */
export type TelemetryParadata = CommonParadata &
  (
    | InitParadata
    | ExitParadata
    | PageParadata
    | InputParadata
    | ControlParadata
    | ContactSupportParadata
  )

/** Paradata values computed for every events */
export type CommonParadata = {
  /** date in ISO 8601 */
  date: string
}

/** Event sent when the user log in the orchestrator */
export type InitParadata = {
  type: TELEMETRY_EVENT_TYPE.INIT
}

/** Event sent when the user logs out of the orchestrator */
export type ExitParadata = {
  source: TELEMETRY_EVENT_EXIT_SOURCE.LOGOUT
  type: TELEMETRY_EVENT_TYPE.EXIT
}

/** Event sent when the user changes page through navigation buttons such as
 * 'next' and 'previous' within the orchestrator */
export type PageParadata = {
  page: string
  pageTag: string
  type: TELEMETRY_EVENT_TYPE.NEW_PAGE
}

/** Event sent when the user inputs a value */
export type InputParadata = {
  iteration?: number[]
  name: string
  type: TELEMETRY_EVENT_TYPE.INPUT
}

/** Event sent when the user triggers a control or chooses to skip it */
export type ControlParadata = {
  controlIds: string[]
  type: TELEMETRY_EVENT_TYPE.CONTROL | TELEMETRY_EVENT_TYPE.CONTROL_SKIP
}

/** Event sent when the user clicks on the "contact support" */
export type ContactSupportParadata = {
  type: TELEMETRY_EVENT_TYPE.CONTACT_SUPPORT
}
