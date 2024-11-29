import { memo, useCallback } from 'react'

import type { LunaticData } from '@inseefr/lunatic'
import { useQueryClient } from '@tanstack/react-query'

import { getGetNomenclatureByIdQueryOptions } from '@/api/04-nomenclatures'
import {
  getGenerateDepositProofQueryOptions,
  getGetSurveyUnitByIdQueryKey,
  updateSurveyUnitDataStateDataById,
} from '@/api/06-survey-units'
import { showToast } from '@/components/Toast'
import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import { MODE_TYPE } from '@/constants/mode'
import type { StateData } from '@/models/StateData'
import type { LunaticGetReferentiel, Nomenclature } from '@/models/lunaticType'

import { collectRoute } from './route'

export const CollectPage = memo(function CollectPage() {
  const { surveyUnitId } = collectRoute.useParams()

  const queryClient = useQueryClient()

  const loaderResults = collectRoute.useLoaderData()

  const { source, surveyUnitData, metadata } = loaderResults

  const getReferentiel: LunaticGetReferentiel = useCallback(
    (name: string) =>
      queryClient
        .ensureQueryData(getGetNomenclatureByIdQueryOptions(name))
        .then((result) => result as Nomenclature),
    [queryClient],
  )

  const queryKeyToInvalidate = getGetSurveyUnitByIdQueryKey(surveyUnitId)

  const updateDataAndStateData = (params: {
    stateData: StateData
    data: LunaticData['COLLECTED']
    onSuccess?: () => void
  }) =>
    updateSurveyUnitDataStateDataById(surveyUnitId, {
      data: params.data,
      stateData: params.stateData,
    })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: [queryKeyToInvalidate],
        })

        params.onSuccess?.()

        if (params.data) {
          showToast({
            severity: 'success',
            description:
              'Vos modifications ont été enregistrées et sauvegardées.',
            title: 'Données sauvegardées avec succès !',
          })
        }
      })
      .catch(() => {
        showToast({
          severity: 'error',
          title: 'Erreur de sauvegarde',
          description:
            "Une erreur est survenue lors de l'enregistrement de vos modifications. ",
        })
      })

  const getDepositProof = () =>
    queryClient
      .ensureQueryData(getGenerateDepositProofQueryOptions(surveyUnitId))
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
      surveyUnitData={surveyUnitData}
      getReferentiel={getReferentiel}
      updateDataAndStateData={updateDataAndStateData}
      getDepositProof={getDepositProof}
    />
  )
})
