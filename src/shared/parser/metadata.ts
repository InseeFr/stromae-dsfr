import type { Metadata } from 'model/Metadata'
import { assert, type Equals } from 'tsafe/assert'
import { z } from 'zod'

const logoSchema = z.object({
  label: z.string(),
  url: z.string(),
})

const logosSchema = z.object({
  main: logoSchema,
  secondaries: z.array(logoSchema).optional(),
})

export const metadataSchema = z.object({
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
  variables: z
    .array(
      z.object({
        name: z.string(),
        value: z.unknown(),
      })
    )
    .optional(),
})

type InferredMetadata = z.infer<typeof metadataSchema>

assert<Equals<InferredMetadata, Metadata>>()
