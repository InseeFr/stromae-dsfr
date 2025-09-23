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
import type { LunaticGetReferentiel, Nomenclature } from '@/models/lunaticType'
import type { StateData } from '@/models/stateData'

import { collectRoute } from './route'

export const CollectPage = memo(function CollectPage() {
  const { interrogationId } = collectRoute.useParams()

  const queryClient = useQueryClient()

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
            description:
              'Vos modifications ont été enregistrées et sauvegardées.',
            title: 'Données sauvegardées avec succès !',
          })
        }
      })
      .catch((error: Error) => {
        if (!params.isLogout) {
          showToast({
            severity: 'error',
            title: 'Erreur de sauvegarde',
            description:
              "Une erreur est survenue lors de l'enregistrement de vos modifications.",
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
      source={source}
      initialInterrogation={interrogation}
      getReferentiel={getReferentiel}
      updateDataAndStateData={updateDataAndStateData}
      getDepositProof={getDepositProof}
    />
  )
})
