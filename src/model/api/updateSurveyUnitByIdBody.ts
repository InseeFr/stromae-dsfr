/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * queen-api
 * API for Queen/Stromae
 * OpenAPI spec version: 4.3.1-SNAPSHOT
 */
import type { UpdateSurveyUnitByIdBodyComment } from './updateSurveyUnitByIdBodyComment'
import type { UpdateSurveyUnitByIdBodyData } from './updateSurveyUnitByIdBodyData'
import type { UpdateSurveyUnitByIdBodyPersonalizationItem } from './updateSurveyUnitByIdBodyPersonalizationItem'
import type { UpdateSurveyUnitByIdBodyStateData } from './updateSurveyUnitByIdBodyStateData'

export type UpdateSurveyUnitByIdBody = {
  comment?: UpdateSurveyUnitByIdBodyComment
  /** Validation of survey unit data */
  data?: UpdateSurveyUnitByIdBodyData
  /** Validation of personalizations for a survey unit */
  personalization?: UpdateSurveyUnitByIdBodyPersonalizationItem[]
  stateData?: UpdateSurveyUnitByIdBodyStateData
}