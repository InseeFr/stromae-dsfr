import { Orchestrator } from '@/shared/components/Orchestrator/Orchestrator'
import type { LunaticGetReferentiel } from '@/shared/components/Orchestrator/utils/lunaticType'
import { nomenclatureQueryOptions } from '@/shared/query/visualizeQueryOptions'
import { useQueryClient } from '@tanstack/react-query'
import { memo } from 'react'
import { VisualizeForm } from './Form/VisualizeForm'
import { visualizeRoute } from './route'

export const VisualizePage = memo(function VisualizePage() {
  const loaderResults = visualizeRoute.useLoaderData()
  const queryClient = useQueryClient()

  if (!loaderResults) {
    return <VisualizeForm />
  }
  const { source, surveyUnitData, nomenclature, metadata } = loaderResults

  const getReferentiel: LunaticGetReferentiel = (name: string) => {
    if (!nomenclature) {
      return Promise.reject(new Error('No nomenclature provided'))
    }

    if (!nomenclature[name]) {
      return Promise.reject(
        new Error(`The nomenclature ${name} is not provided`)
      )
    }
    return queryClient.ensureQueryData(
      nomenclatureQueryOptions(nomenclature[name])
    )
  }

  return (
    <Orchestrator
      mode="visualize"
      metadata={metadata}
      source={source}
      surveyUnitData={surveyUnitData}
      getReferentiel={getReferentiel}
    />
  )
})
