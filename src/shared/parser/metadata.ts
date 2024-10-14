import type { SurveyUnitMetadata } from '@/model/api'
import { assert } from 'tsafe/assert'
import type { Extends } from 'tsafe/Extends'
import { z } from 'zod'

const logoSchema = z.object({
  label: z.string(),
  url: z.string(),
})

const logosSchema = z.object({
  main: logoSchema,
  secondaries: z.array(logoSchema).optional(),
})

// Schema for Content
const contentSchema = z.object({
  type: z.enum(['paragraph', 'list']),
  textItems: z.array(z.string()),
})

// Schema for Contents
const contentsSchema = z.object({
  title: z.string().optional(),
  contentBlocks: z.array(contentSchema),
})

export const surveyUnitMetadataSchema = z.object({
  context: z.enum(['household', 'business']),
  label: z.string(),
  logos: logosSchema.optional(),
  objectives: z.string(),
  personalization: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  surveyUnitIdentifier: z.string().optional(),
  surveyUnitInfo: contentsSchema.array().optional(),
  campaignInfo: contentsSchema.array().optional(),
})

type InferredMetadata = z.infer<typeof surveyUnitMetadataSchema>
assert<Extends<InferredMetadata, SurveyUnitMetadata>>() //When SurveyUnitMetadata will change according to the new modelisation, replace Extends by Equals
