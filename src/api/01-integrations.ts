/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * queen-api
 * API for Queen/Stromae
 * OpenAPI spec version: 5.0.0-rc
 */
import { useMutation } from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryClient,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'

import type {
  IntegrateContextBody,
  IntegrateXmlContextBody,
  IntegrationResults,
} from '../models/api'
import { stromaeInstance } from './axiosInstance'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Authorized roles: ADMIN / WEBCLIENT /
 * @deprecated
 * @summary Integrates the context of a campaign (XML Version - will be removed in a future version)
 */
export const integrateXmlContext = (
  integrateXmlContextBody: IntegrateXmlContextBody,
  options?: SecondParameter<typeof stromaeInstance>,
  signal?: AbortSignal,
) => {
  const formData = new FormData()
  formData.append(`file`, integrateXmlContextBody.file)

  return stromaeInstance<IntegrationResults>(
    {
      url: `/api/campaign/xml/context`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      signal,
    },
    options,
  )
}

export const getIntegrateXmlContextMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof integrateXmlContext>>,
    TError,
    { data: IntegrateXmlContextBody },
    TContext
  >
  request?: SecondParameter<typeof stromaeInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof integrateXmlContext>>,
  TError,
  { data: IntegrateXmlContextBody },
  TContext
> => {
  const mutationKey = ['integrateXmlContext']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof integrateXmlContext>>,
    { data: IntegrateXmlContextBody }
  > = (props) => {
    const { data } = props ?? {}

    return integrateXmlContext(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type IntegrateXmlContextMutationResult = NonNullable<
  Awaited<ReturnType<typeof integrateXmlContext>>
>
export type IntegrateXmlContextMutationBody = IntegrateXmlContextBody
export type IntegrateXmlContextMutationError = unknown

/**
 * @deprecated
 * @summary Integrates the context of a campaign (XML Version - will be removed in a future version)
 */
export const useIntegrateXmlContext = <TError = unknown, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof integrateXmlContext>>,
      TError,
      { data: IntegrateXmlContextBody },
      TContext
    >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof integrateXmlContext>>,
  TError,
  { data: IntegrateXmlContextBody },
  TContext
> => {
  const mutationOptions = getIntegrateXmlContextMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Authorized roles: ADMIN / WEBCLIENT /
 * @summary Integrates the context of a campaign (JSON version)
 */
export const integrateContext = (
  integrateContextBody: IntegrateContextBody,
  options?: SecondParameter<typeof stromaeInstance>,
  signal?: AbortSignal,
) => {
  const formData = new FormData()
  formData.append(`file`, integrateContextBody.file)

  return stromaeInstance<IntegrationResults>(
    {
      url: `/api/campaign/context`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      signal,
    },
    options,
  )
}

export const getIntegrateContextMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof integrateContext>>,
    TError,
    { data: IntegrateContextBody },
    TContext
  >
  request?: SecondParameter<typeof stromaeInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof integrateContext>>,
  TError,
  { data: IntegrateContextBody },
  TContext
> => {
  const mutationKey = ['integrateContext']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof integrateContext>>,
    { data: IntegrateContextBody }
  > = (props) => {
    const { data } = props ?? {}

    return integrateContext(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type IntegrateContextMutationResult = NonNullable<
  Awaited<ReturnType<typeof integrateContext>>
>
export type IntegrateContextMutationBody = IntegrateContextBody
export type IntegrateContextMutationError = unknown

/**
 * @summary Integrates the context of a campaign (JSON version)
 */
export const useIntegrateContext = <TError = unknown, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof integrateContext>>,
      TError,
      { data: IntegrateContextBody },
      TContext
    >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof integrateContext>>,
  TError,
  { data: IntegrateContextBody },
  TContext
> => {
  const mutationOptions = getIntegrateContextMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
