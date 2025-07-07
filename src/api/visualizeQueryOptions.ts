import type { LunaticSource } from '@inseefr/lunatic'
import { queryOptions } from '@tanstack/react-query'
import axios, { type AxiosRequestConfig } from 'axios'
import { ZodError } from 'zod'

import { ZodErrorWithName } from '@/components/error/ZodErrorWithName'
import type { Interrogation } from '@/models/interrogation'
import type { Nomenclature } from '@/models/lunaticType'
import type { Metadata } from '@/models/metadata'
import { interrogationMetadataSchema } from '@/models/metadataSchema'

function axiosGet<T>(url: string, options?: AxiosRequestConfig) {
  return axios.get<T>(url, options).then(({ data }) => data)
}

export const sourceQueryOptions = (
  sourceUrl: string,
  options?: AxiosRequestConfig,
) =>
  queryOptions({
    queryKey: [sourceUrl],
    queryFn: () => axiosGet<LunaticSource>(sourceUrl, options),
  })

export const interrogationQueryOptions = (
  interrogationUrl: string,
  options?: AxiosRequestConfig,
) =>
  queryOptions({
    queryKey: [interrogationUrl],
    queryFn: () => axiosGet<Interrogation>(interrogationUrl, options),
  })

export const metadataQueryOptions = (
  metadataUrl: string,
  options?: AxiosRequestConfig,
) =>
  queryOptions({
    queryKey: [metadataUrl],
    queryFn: () =>
      axiosGet<Metadata>(metadataUrl, options)
        .then((metadata) => interrogationMetadataSchema.parse(metadata))
        .catch((e) => {
          if (e instanceof ZodError) {
            throw new ZodErrorWithName(e.issues, 'metadata')
          }
          throw e
        }),
  })

export const nomenclatureQueryOptions = (
  nomenclatureUrl: string,
  options?: AxiosRequestConfig,
) =>
  queryOptions({
    queryKey: [nomenclatureUrl],
    queryFn: () => axiosGet<Nomenclature>(nomenclatureUrl, options),
  })
