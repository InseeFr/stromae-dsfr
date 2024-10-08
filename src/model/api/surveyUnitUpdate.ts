/**
 * Generated by orval v7.0.1 🍺
 * Do not edit manually.
 * queen-api
 * API for Queen/Stromae
 * OpenAPI spec version: 4.3.15
 */
import type { SchemaData } from './schema.data/schemaData'
import type { SchemaPersonalization } from './schema.personalization/schemaPersonalization'
import type { StateDataForSurveyUnitUpdate } from './stateDataForSurveyUnitUpdate'
import type { SurveyUnitUpdateComment } from './surveyUnitUpdateComment'

export interface SurveyUnitUpdate {
  comment?: SurveyUnitUpdateComment
  data?: SchemaData
  personalization?: SchemaPersonalization
  stateData?: StateDataForSurveyUnitUpdate
}
