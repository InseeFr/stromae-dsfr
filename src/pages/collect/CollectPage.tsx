import { memo, useCallback } from 'react'

import type { LunaticData } from '@inseefr/lunatic'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { getGetNomenclatureByIdQueryOptions } from '@/api/04-nomenclatures'
import {
  getGenerateDepositProofQueryOptions,
  getGetInterrogationByIdQueryKey,
  updateInterrogationDataStateDataById,
} from '@/api/06-interrogations'
import { showToast } from '@/components/Toast'
import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import { MODE_TYPE } from '@/constants/mode'
import type { GenerateDepositProofParams } from '@/models/api'
import type { LunaticGetReferentiel, Nomenclature } from '@/models/lunaticType'
import type { StateData } from '@/models/stateData'

import { collectRoute } from './route'

export const CollectPage = memo(function CollectPage() {
  const { interrogationId } = collectRoute.useParams()

  const queryClient = useQueryClient()

  const { t } = useTranslation()

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

  const isDownloadEnabled = import.meta.env.VITE_DOWNLOAD_ENABLED === 'true'

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
            description: t('collectPage.toast.toastSaveSuccessDescription'),
            title: t('collectPage.toast.toastSaveSuccessTitle'),
          })
        }
      })
      .catch((error: Error) => {
        if (!params.isLogout) {
          let title
          let description
          if (error.message === 'Network Error') {
            title = t('collectPage.toast.toastSaveNetworkErrorTitle')
            description = t(
              'collectPage.toast.toastSaveNetworkErrorDescription',
            )
          } else {
            title = t('collectPage.toast.toastSaveErrorTitle')
            description = t('collectPage.toast.toastSaveErrorDescription')
          }

          showToast({ severity: 'error', title, description })

          return Promise.reject(error)
        }
      })

  const getDepositProof = (params?: GenerateDepositProofParams) =>
    queryClient
      .ensureQueryData(
        getGenerateDepositProofQueryOptions(interrogationId, params),
      )
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
