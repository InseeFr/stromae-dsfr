import { createRoute } from '@tanstack/react-router'
import { z } from 'zod'

import {
  metadataQueryOptions,
  sourceQueryOptions,
  surveyUnitDataQueryOptions,
} from '@/api/visualizeQueryOptions'
import { ContentSkeleton } from '@/components/ContentSkeleton'
import { ErrorComponent } from '@/components/error/ErrorComponent'
import { rootRoute } from '@/router/router'
import { metadataStore } from '@/stores/metadataStore'
import { convertOldPersonalization } from '@/utils/convertOldPersonalization'

import { VisualizePage } from './Visualize'

const visualizeSearchSchema = z
  .object({
    source: z.string().transform(decodeURIComponent).optional(),
    metadata: z.string().transform(decodeURIComponent).optional(),
    data: z.string().transform(decodeURIComponent).optional(),
    nomenclature: z.record(z.string().transform(decodeURIComponent)).optional(),
  })
  .optional()

export const visualizePath = '/visualize'
export const visualizeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: visualizePath,
  component: VisualizePage,
  validateSearch: visualizeSearchSchema,
  loaderDeps: ({ search }) => ({
    sourceUrl: search?.source,
    surveyUnitDataUrl: search?.data,
    metadataUrl: search?.metadata,
    nomenclature: search?.nomenclature,
  }),
  loader: async ({
    context: { queryClient },
    deps: { sourceUrl, surveyUnitDataUrl, metadataUrl, nomenclature },
    abortController,
  }) => {
    document.title = "Visualisation | Filière d'Enquête"

    if (!sourceUrl) {
      return
    }

    const sourcePr = queryClient.ensureQueryData(
      sourceQueryOptions(sourceUrl, { signal: abortController.signal }),
    )

    const surveyUnitDataPr = surveyUnitDataUrl
      ? queryClient.ensureQueryData(
          surveyUnitDataQueryOptions(surveyUnitDataUrl, {
            signal: abortController.signal,
          }),
        )
      : Promise.resolve(undefined)

    const metadataPr = metadataUrl
      ? queryClient
          .ensureQueryData(
            metadataQueryOptions(metadataUrl, {
              signal: abortController.signal,
            }),
          )
          .then((metadata) => {
            if (metadata.label) {
              document.title = metadata.label
            }
            return metadataStore.updateMetadata({
              ...metadata,
              mainLogo: metadata.logos?.main,
              secondariesLogo: metadata.logos?.secondaries,
              surveyUnitInfo: convertOldPersonalization(
                metadata.personalization,
              ),
            })
          })
      : Promise.resolve(metadataStore.getSnapshot())

    return Promise.all([sourcePr, surveyUnitDataPr, metadataPr]).then(
      ([source, surveyUnitData, metadata]) => {
        return { source, surveyUnitData, metadata, nomenclature }
      },
    )
  },
  errorComponent: ({ error, reset }) => (
    <ErrorComponent error={error} reset={reset} redirectTo="visualizeForm" />
  ),
  pendingComponent: ContentSkeleton,
})
