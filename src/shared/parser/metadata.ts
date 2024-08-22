import type { SurveyUnitMetadata } from 'model/api'
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
  variables: z
    .array(
      z
        .object({
          name: z.string(),
          value: z.unknown(),
        })
        .transform(({ name, value }) => ({ name, value })) //To solve zod issue cf https://github.com/colinhacks/zod/issues/2966#issuecomment-2000436630
    )
    .optional(),
})

type InferredMetadata = z.infer<typeof surveyUnitMetadataSchema>
assert<Equals<InferredMetadata, SurveyUnitMetadata>>()
