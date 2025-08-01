/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * queen-api
 * API for Queen/Stromae
 * OpenAPI spec version: 5.0.0-rc
 */
import type { SchemaData } from '../schema.data/schemaData'
import type { SchemaPersonalization } from '../schema.personalization/schemaPersonalization'
import type { SchemaInterrogationTempZoneComment } from './schemaInterrogationTempZoneComment'
import type { StateData } from './stateData'

/**
 * Validation of interrogation temp zone
 */
export interface SchemaInterrogationTempZone {
  data: SchemaData
  comment?: SchemaInterrogationTempZoneComment
  personalization?: SchemaPersonalization
  /** @minLength 1 */
  questionnaireId: string
  stateData: StateData
}
