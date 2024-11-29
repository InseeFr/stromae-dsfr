import { type Equals, assert } from 'tsafe/assert'
import z from 'zod'

import { PAGE_TYPE } from '@/constants/page'
import type { InternalPageType, PageType, StromaePage } from '@/models/Page'

export const stromaePageSchema = z.enum([
  PAGE_TYPE.WELCOME,
  PAGE_TYPE.VALIDATION,
  PAGE_TYPE.END,
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
  z.literal(PAGE_TYPE.LUNATIC),
])

assert<Equals<z.infer<typeof internalPageTypeSchema>, InternalPageType>>()
