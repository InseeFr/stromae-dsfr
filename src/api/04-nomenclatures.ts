/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * queen-api
 * API for Queen/Stromae
 * OpenAPI spec version: 5.0.0-rc
 */
import { useMutation, useQuery } from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

import type { NomenclatureCreation } from '../models/api'
import type { SchemaNomenclature } from '../models/api/schema.nomenclature'
import { stromaeInstance } from './axiosInstance'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Authorized roles: ADMIN / WEBCLIENT /
 * @summary Create/update a nomenclature
 */
export const postNomenclature = (
  nomenclatureCreation: NomenclatureCreation,
  options?: SecondParameter<typeof stromaeInstance>,
  signal?: AbortSignal,
) => {
  return stromaeInstance<void>(
    {
      url: `/api/nomenclature`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: nomenclatureCreation,
      signal,
    },
    options,
  )
}

export const getPostNomenclatureMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postNomenclature>>,
    TError,
    { data: NomenclatureCreation },
    TContext
  >
  request?: SecondParameter<typeof stromaeInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof postNomenclature>>,
  TError,
  { data: NomenclatureCreation },
  TContext
> => {
  const mutationKey = ['postNomenclature']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postNomenclature>>,
    { data: NomenclatureCreation }
  > = (props) => {
    const { data } = props ?? {}

    return postNomenclature(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type PostNomenclatureMutationResult = NonNullable<
  Awaited<ReturnType<typeof postNomenclature>>
>
export type PostNomenclatureMutationBody = NomenclatureCreation
export type PostNomenclatureMutationError = unknown

/**
 * @summary Create/update a nomenclature
 */
export const usePostNomenclature = <TError = unknown, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postNomenclature>>,
      TError,
      { data: NomenclatureCreation },
      TContext
    >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof postNomenclature>>,
  TError,
  { data: NomenclatureCreation },
  TContext
> => {
  const mutationOptions = getPostNomenclatureMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
/**
 * Authorized roles: ADMIN / WEBCLIENT / REVIEWER / REVIEWER_ALTERNATIVE / INTERVIEWER / SURVEY_UNIT /
 * @summary Get list of required nomenclature for a questionnaire
 */
export const getListRequiredNomenclatureByQuestionnaireId = (
  id: string,
  options?: SecondParameter<typeof stromaeInstance>,
  signal?: AbortSignal,
) => {
  return stromaeInstance<string[]>(
    {
      url: `/api/questionnaire/${id}/required-nomenclatures`,
      method: 'GET',
      signal,
    },
    options,
  )
}

export const getGetListRequiredNomenclatureByQuestionnaireIdQueryKey = (
  id: string,
) => {
  return [`/api/questionnaire/${id}/required-nomenclatures`] as const
}

export const getGetListRequiredNomenclatureByQuestionnaireIdQueryOptions = <
  TData = Awaited<
    ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>
  >,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>
        >,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof stromaeInstance>
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ??
    getGetListRequiredNomenclatureByQuestionnaireIdQueryKey(id)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>>
  > = ({ signal }) =>
    getListRequiredNomenclatureByQuestionnaireId(id, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetListRequiredNomenclatureByQuestionnaireIdQueryResult =
  NonNullable<
    Awaited<ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>>
  >
export type GetListRequiredNomenclatureByQuestionnaireIdQueryError = unknown

export function useGetListRequiredNomenclatureByQuestionnaireId<
  TData = Awaited<
    ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>
  >,
  TError = unknown,
>(
  id: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>
        >,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<
            ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>
          >,
          TError,
          Awaited<
            ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>
          >
        >,
        'initialData'
      >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetListRequiredNomenclatureByQuestionnaireId<
  TData = Awaited<
    ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>
  >,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>
        >,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<
            ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>
          >,
          TError,
          Awaited<
            ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>
          >
        >,
        'initialData'
      >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetListRequiredNomenclatureByQuestionnaireId<
  TData = Awaited<
    ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>
  >,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>
        >,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Get list of required nomenclature for a questionnaire
 */

export function useGetListRequiredNomenclatureByQuestionnaireId<
  TData = Awaited<
    ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>
  >,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof getListRequiredNomenclatureByQuestionnaireId>
        >,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions =
    getGetListRequiredNomenclatureByQuestionnaireIdQueryOptions(id, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * Authorized roles: ADMIN / WEBCLIENT / REVIEWER / REVIEWER_ALTERNATIVE / INTERVIEWER /
 * @summary Get all nomenclatures Ids
 */
export const getNomenclaturesId = (
  options?: SecondParameter<typeof stromaeInstance>,
  signal?: AbortSignal,
) => {
  return stromaeInstance<string[]>(
    { url: `/api/nomenclatures`, method: 'GET', signal },
    options,
  )
}

export const getGetNomenclaturesIdQueryKey = () => {
  return [`/api/nomenclatures`] as const
}

export const getGetNomenclaturesIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getNomenclaturesId>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getNomenclaturesId>>,
      TError,
      TData
    >
  >
  request?: SecondParameter<typeof stromaeInstance>
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetNomenclaturesIdQueryKey()

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getNomenclaturesId>>
  > = ({ signal }) => getNomenclaturesId(requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getNomenclaturesId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetNomenclaturesIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getNomenclaturesId>>
>
export type GetNomenclaturesIdQueryError = unknown

export function useGetNomenclaturesId<
  TData = Awaited<ReturnType<typeof getNomenclaturesId>>,
  TError = unknown,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getNomenclaturesId>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getNomenclaturesId>>,
          TError,
          Awaited<ReturnType<typeof getNomenclaturesId>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetNomenclaturesId<
  TData = Awaited<ReturnType<typeof getNomenclaturesId>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getNomenclaturesId>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getNomenclaturesId>>,
          TError,
          Awaited<ReturnType<typeof getNomenclaturesId>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetNomenclaturesId<
  TData = Awaited<ReturnType<typeof getNomenclaturesId>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getNomenclaturesId>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Get all nomenclatures Ids
 */

export function useGetNomenclaturesId<
  TData = Awaited<ReturnType<typeof getNomenclaturesId>>,
  TError = unknown,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getNomenclaturesId>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getGetNomenclaturesIdQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * Authorized roles: ADMIN / WEBCLIENT / REVIEWER / REVIEWER_ALTERNATIVE / INTERVIEWER / SURVEY_UNIT /
 * @summary Get Nomenclature
 */
export const getNomenclatureById = (
  id: string,
  options?: SecondParameter<typeof stromaeInstance>,
  signal?: AbortSignal,
) => {
  return stromaeInstance<SchemaNomenclature>(
    { url: `/api/nomenclature/${id}`, method: 'GET', signal },
    options,
  )
}

export const getGetNomenclatureByIdQueryKey = (id: string) => {
  return [`/api/nomenclature/${id}`] as const
}

export const getGetNomenclatureByIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getNomenclatureById>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getNomenclatureById>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof stromaeInstance>
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetNomenclatureByIdQueryKey(id)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getNomenclatureById>>
  > = ({ signal }) => getNomenclatureById(id, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getNomenclatureById>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetNomenclatureByIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getNomenclatureById>>
>
export type GetNomenclatureByIdQueryError = unknown

export function useGetNomenclatureById<
  TData = Awaited<ReturnType<typeof getNomenclatureById>>,
  TError = unknown,
>(
  id: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getNomenclatureById>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getNomenclatureById>>,
          TError,
          Awaited<ReturnType<typeof getNomenclatureById>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetNomenclatureById<
  TData = Awaited<ReturnType<typeof getNomenclatureById>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getNomenclatureById>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getNomenclatureById>>,
          TError,
          Awaited<ReturnType<typeof getNomenclatureById>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetNomenclatureById<
  TData = Awaited<ReturnType<typeof getNomenclatureById>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getNomenclatureById>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Get Nomenclature
 */

export function useGetNomenclatureById<
  TData = Awaited<ReturnType<typeof getNomenclatureById>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getNomenclatureById>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getGetNomenclatureByIdQueryOptions(id, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * Authorized roles: ADMIN / WEBCLIENT / REVIEWER / REVIEWER_ALTERNATIVE / INTERVIEWER / SURVEY_UNIT /
 * @summary Get list of required nomenclatures for a campaign
 */
export const getListRequiredNomenclature = (
  id: string,
  options?: SecondParameter<typeof stromaeInstance>,
  signal?: AbortSignal,
) => {
  return stromaeInstance<string[]>(
    {
      url: `/api/campaign/${id}/required-nomenclatures`,
      method: 'GET',
      signal,
    },
    options,
  )
}

export const getGetListRequiredNomenclatureQueryKey = (id: string) => {
  return [`/api/campaign/${id}/required-nomenclatures`] as const
}

export const getGetListRequiredNomenclatureQueryOptions = <
  TData = Awaited<ReturnType<typeof getListRequiredNomenclature>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getListRequiredNomenclature>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof stromaeInstance>
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getGetListRequiredNomenclatureQueryKey(id)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getListRequiredNomenclature>>
  > = ({ signal }) => getListRequiredNomenclature(id, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getListRequiredNomenclature>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetListRequiredNomenclatureQueryResult = NonNullable<
  Awaited<ReturnType<typeof getListRequiredNomenclature>>
>
export type GetListRequiredNomenclatureQueryError = unknown

export function useGetListRequiredNomenclature<
  TData = Awaited<ReturnType<typeof getListRequiredNomenclature>>,
  TError = unknown,
>(
  id: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getListRequiredNomenclature>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getListRequiredNomenclature>>,
          TError,
          Awaited<ReturnType<typeof getListRequiredNomenclature>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetListRequiredNomenclature<
  TData = Awaited<ReturnType<typeof getListRequiredNomenclature>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getListRequiredNomenclature>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getListRequiredNomenclature>>,
          TError,
          Awaited<ReturnType<typeof getListRequiredNomenclature>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetListRequiredNomenclature<
  TData = Awaited<ReturnType<typeof getListRequiredNomenclature>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getListRequiredNomenclature>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Get list of required nomenclatures for a campaign
 */

export function useGetListRequiredNomenclature<
  TData = Awaited<ReturnType<typeof getListRequiredNomenclature>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getListRequiredNomenclature>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof stromaeInstance>
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getGetListRequiredNomenclatureQueryOptions(id, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData> }

  query.queryKey = queryOptions.queryKey

  return query
}
