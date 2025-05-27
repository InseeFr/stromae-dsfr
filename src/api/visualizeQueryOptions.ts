import type { LunaticSource } from '@inseefr/lunatic'
import { queryOptions } from '@tanstack/react-query'
import axios, { type AxiosRequestConfig } from 'axios'
import { ZodError } from 'zod'

import { ZodErrorWithName } from '@/components/error/ZodErrorWithName'
import type { Nomenclature } from '@/models/lunaticType'
import type { Metadata } from '@/models/metadata'
import { surveyUnitMetadataSchema } from '@/models/metadataSchema'
import type { SurveyUnit } from '@/models/surveyUnit'

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

export const surveyUnitQueryOptions = (
  surveyUnitUrl: string,
  options?: AxiosRequestConfig,
) =>
  queryOptions({
    queryKey: [surveyUnitUrl],
    queryFn: () => axiosGet<SurveyUnit>(surveyUnitUrl, options),
  })

export const metadataQueryOptions = (
  metadataUrl: string,
  options?: AxiosRequestConfig,
) =>
  queryOptions({
    queryKey: [metadataUrl],
    queryFn: () =>
      axiosGet<Metadata>(metadataUrl, options)
        .then((metadata) => surveyUnitMetadataSchema.parse(metadata))
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
