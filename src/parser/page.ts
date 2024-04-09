import type { InternalPageType, PageType, StromaePage } from 'model/Page'
import { assert, type Equals } from 'tsafe/assert'
import z from 'zod'

export const stromaePageSchema = z.enum([
  'welcomePage',
  'validationPage',
  'endPage',
])

assert<Equals<z.infer<typeof stromaePageSchema>, StromaePage>>()

export const pageTagSchema = z.custom<
  `${number}` | `${number}.${number}#${number}`
>((value) => {
  return typeof value === 'string' ? /^\d+(?:\.\d+#\d+)?$/.test(value) : false
})

export const pageTypeSchema = z.union([stromaePageSchema, pageTagSchema])

assert<Equals<z.infer<typeof pageTypeSchema>, PageType>>()

export const internalPageTypeSchema = z.union([
  stromaePageSchema,
  z.literal('lunaticPage'),
])
assert<Equals<z.infer<typeof internalPageTypeSchema>, InternalPageType>>()
