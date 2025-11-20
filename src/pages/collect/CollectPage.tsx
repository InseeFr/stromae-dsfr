import { memo, useCallback } from 'react'

import type { LunaticData } from '@inseefr/lunatic'
import { useQueryClient } from '@tanstack/react-query'

import { getGetNomenclatureByIdQueryOptions } from '@/api/04-nomenclatures'
import {
  getGenerateDepositProofQueryOptions,
  getGetInterrogationByIdQueryKey,
  updateInterrogationDataStateDataById,
} from '@/api/06-interrogations'
import { showToast } from '@/components/Toast'
import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import { MODE_TYPE } from '@/constants/mode'
import { declareComponentKeys, useTranslation } from '@/i18n'
import type { LunaticGetReferentiel, Nomenclature } from '@/models/lunaticType'
import type { StateData } from '@/models/stateData'

import { collectRoute } from './route'

export const CollectPage = memo(function CollectPage() {
  const { interrogationId } = collectRoute.useParams()

  const queryClient = useQueryClient()

  const { t } = useTranslation({ CollectPage })

  const loaderResults = collectRoute.useLoaderData()

  const { source, interrogation, metadata } = loaderResults

  const getReferentiel: LunaticGetReferentiel = useCallback(
    (name: string) =>
      queryClient
        .ensureQueryData(getGetNomenclatureByIdQueryOptions(name))
        .then((result) => result as Nomenclature),
    [queryClient],
  )

  const queryKeyToInvalidate = getGetInterrogationByIdQueryKey(interrogationId)

  const isDownloadEnabled = import.meta.env.VITE_DOWNLOAD_DISABLED !== 'true'

  const updateDataAndStateData = (params: {
    stateData: StateData
    data: LunaticData['COLLECTED']
    onSuccess?: () => void
    isLogout: boolean
  }) =>
    updateInterrogationDataStateDataById(interrogationId, {
      data: params.data,
      stateData: params.stateData,
    })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: [queryKeyToInvalidate],
        })

        params.onSuccess?.()

        if (params.data && !params.isLogout) {
          showToast({
            severity: 'success',
            description: t('toast save success description'),
            title: t('toast save success title'),
          })
        }
      })
      .catch((error: Error) => {
        if (!params.isLogout) {
          if (error.message === 'Network Error') {
            showToast({
              severity: 'error',
              title: t('toast save network error title'),
              description: t('toast save network error description'),
            })
            return Promise.reject(error)
          }
          showToast({
            severity: 'error',
            title: t('toast save error title'),
            description: t('toast save error description'),
          })
          return Promise.reject(error)
        }
      })

  const getDepositProof = () =>
    queryClient
      .ensureQueryData(getGenerateDepositProofQueryOptions(interrogationId))
      .then((response) => {
        const fileName =
          (response.headers['content-disposition']?.match(
            /filename="(.+?)"/,
          )[1] as string) ?? 'document.pdf' //content-disposition is present in OpenAPI spec but not well inferred by type

        const url = URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      })
      .catch((error) => {
        console.error('Error downloading PDF:', error)
      })

  return (
    <Orchestrator
      metadata={metadata}
      mode={MODE_TYPE.COLLECT}
      isDownloadEnabled={isDownloadEnabled}
      source={source}
      initialInterrogation={interrogation}
      getReferentiel={getReferentiel}
      updateDataAndStateData={updateDataAndStateData}
      getDepositProof={getDepositProof}
    />
  )
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  | 'toast save success title'
  | 'toast save success description'
  | 'toast save error title'
  | 'toast save error description'
  | 'toast save network error title'
  | 'toast save network error description'
>()({ CollectPage })

export type I18n = typeof i18n
