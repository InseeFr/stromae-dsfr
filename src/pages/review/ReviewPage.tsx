import { memo } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { getGetNomenclatureByIdQueryOptions } from '@/api/04-nomenclatures'
import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import { MODE_TYPE } from '@/constants/mode'
import type { LunaticGetReferentiel, Nomenclature } from '@/models/lunaticType'

import { reviewRoute } from './route'

export const ReviewPage = memo(function ReviewPage() {
  const queryClient = useQueryClient()

  const loaderResults = reviewRoute.useLoaderData()

  const { source, interrogation, metadata } = loaderResults

  const getReferentiel: LunaticGetReferentiel = (name: string) =>
    queryClient
      .ensureQueryData(getGetNomenclatureByIdQueryOptions(name))
      .then((result) => result as Nomenclature) //We should remove this cast when type fixed in api

  return (
    <Orchestrator
      mode={MODE_TYPE.REVIEW}
      metadata={metadata}
      source={source}
      initialInterrogation={interrogation}
      getReferentiel={getReferentiel}
    />
  )
})
