/**
 * Generated by orval v7.0.1 🍺
 * Do not edit manually.
 * queen-api
 * API for Queen/Stromae
 * OpenAPI spec version: 4.3.15
 */
import type { MetadataCreation } from './metadataCreation'

export interface CampaignCreation {
  id?: string
  label: string
  metadata?: MetadataCreation
  questionnaireIds: string[]
}
