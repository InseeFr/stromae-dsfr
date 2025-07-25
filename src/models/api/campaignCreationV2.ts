/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * queen-api
 * API for Queen/Stromae
 * OpenAPI spec version: 5.0.0-rc
 */
import type { CampaignCreationV2Sensitivity } from './campaignCreationV2Sensitivity'
import type { SchemaMetadata } from './schema.metadata/schemaMetadata'

export interface CampaignCreationV2 {
  id?: string
  /** @minLength 1 */
  label: string
  sensitivity?: CampaignCreationV2Sensitivity
  /** @minItems 1 */
  questionnaireIds: string[]
  metadata?: SchemaMetadata
}
