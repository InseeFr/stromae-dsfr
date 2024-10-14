import { getGetNomenclatureByIdQueryOptions } from '@/api/04-nomenclatures'
import { Orchestrator } from '@/shared/components/Orchestrator/Orchestrator'
import type {
  LunaticGetReferentiel,
  Nomenclature,
} from '@/shared/components/Orchestrator/utils/lunaticType'
import { useQueryClient } from '@tanstack/react-query'
import { memo } from 'react'
import { reviewRoute } from './route'

export const ReviewPage = memo(function ReviewPage() {
  const queryClient = useQueryClient()

  const loaderResults = reviewRoute.useLoaderData()

  const { source, surveyUnitData, metadata } = loaderResults

  const getReferentiel: LunaticGetReferentiel = (name: string) =>
    queryClient
      .ensureQueryData(getGetNomenclatureByIdQueryOptions(name))
      .then((result) => result as Nomenclature) //We should remove this cast when type fixed in api

  return (
    <Orchestrator
      mode="review"
      metadata={metadata}
      source={source}
      surveyUnitData={surveyUnitData}
      getReferentiel={getReferentiel}
    />
  )
})
