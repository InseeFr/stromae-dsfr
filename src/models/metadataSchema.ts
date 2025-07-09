import type { Extends } from 'tsafe/Extends'
import { assert } from 'tsafe/assert'
import { z } from 'zod'

import type { InterrogationMetadata } from '@/models/api'

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

export const interrogationMetadataSchema = z.object({
  context: z.enum(['household', 'business']),
  label: z.string(),
  logos: logosSchema.optional(),
  objectives: z.string(),
  personalization: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  interrogationdentifier: z.string().optional(),
  interrogationInfo: contentsSchema.array().optional(),
  campaignInfo: contentsSchema.array().optional(),
})

type InferredMetadata = z.infer<typeof interrogationMetadataSchema>
assert<Extends<InferredMetadata, InterrogationMetadata>>() //When InterrogationMetadata will change according to the new modelisation, replace Extends by Equals
