import { memo } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { nomenclatureQueryOptions } from '@/api/visualizeQueryOptions'
import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import { MODE_TYPE } from '@/constants/mode'
import type { LunaticGetReferentiel } from '@/models/lunaticType'

import { VisualizeForm } from './form/VisualizeForm'
import { visualizeRoute } from './route'

export const VisualizePage = memo(function VisualizePage() {
  const loaderResults = visualizeRoute.useLoaderData()
  const queryClient = useQueryClient()

  if (!loaderResults) {
    return <VisualizeForm />
  }
  const { source, interrogation, nomenclature, metadata } = loaderResults

  const getReferentiel: LunaticGetReferentiel = (name: string) => {
    if (!nomenclature) {
      return Promise.reject(new Error('No nomenclature provided'))
    }

    if (!nomenclature[name]) {
      return Promise.reject(
        new Error(`The nomenclature ${name} is not provided`),
      )
    }
    return queryClient.ensureQueryData(
      nomenclatureQueryOptions(nomenclature[name]),
    )
  }

  return (
    <Orchestrator
      mode={MODE_TYPE.VISUALIZE}
      metadata={metadata}
      source={source}
      interrogation={interrogation}
      getReferentiel={getReferentiel}
    />
  )
})
