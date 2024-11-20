import type { LunaticSource } from '@inseefr/lunatic'
import { queryOptions } from '@tanstack/react-query'
import axios, { type AxiosRequestConfig } from 'axios'
import { ZodError } from 'zod'

import { ZodErrorWithName } from '@/components/error/utils/zodErrorWithName'
import type { Nomenclature } from '@/components/orchestrator/utils/lunaticType'
import type { Metadata } from '@/models/metadata'
import { surveyUnitMetadataSchema } from '@/models/metadataSchema'
import type { SurveyUnitData } from '@/models/surveyUnitData'

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

export const surveyUnitDataQueryOptions = (
  surveyUnitDataUrl: string,
  options?: AxiosRequestConfig,
) =>
  queryOptions({
    queryKey: [surveyUnitDataUrl],
    queryFn: () => axiosGet<SurveyUnitData>(surveyUnitDataUrl, options),
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
