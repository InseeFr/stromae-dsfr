/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * queen-api
 * API for Queen/Stromae
 * OpenAPI spec version: 4.3.10-SNAPSHOT
 */
import type { SchemaMetadata } from './schema.metadata/schemaMetadata'

export interface CampaignCreationV2 {
  id?: string
  label: string
  metadata?: SchemaMetadata
  questionnaireIds: string[]
}
