import { createRoute } from '@tanstack/react-router'
import { rootRoute } from 'router/router'
import { ContentSkeleton } from 'shared/components/ContentSkeleton'
import { ErrorComponent } from 'shared/components/Error/ErrorComponent'
import { metadataStore } from 'shared/metadataStore/metadataStore'
import {
  metadataQueryOptions,
  sourceQueryOptions,
  surveyUnitDataQueryOptions,
} from 'shared/query/visualizeQueryOptions'
import { z } from 'zod'
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
      sourceQueryOptions(sourceUrl, { signal: abortController.signal })
    )

    const surveyUnitDataPr = surveyUnitDataUrl
      ? queryClient.ensureQueryData(
          surveyUnitDataQueryOptions(surveyUnitDataUrl, {
            signal: abortController.signal,
          })
        )
      : Promise.resolve(undefined)

    const metadataPr = metadataUrl
      ? queryClient
          .ensureQueryData(
            metadataQueryOptions(metadataUrl, {
              signal: abortController.signal,
            })
          )
          .then((metadata) => {
            metadataStore.updateMetadata({
              label: metadata.label,
              mainLogo: metadata.logos?.main,
              secondariesLogo: metadata.logos?.secondaries,
            })

            metadata.label && (document.title = metadata.label)

            return metadata
          })
      : Promise.resolve(undefined)

    return Promise.all([sourcePr, surveyUnitDataPr, metadataPr]).then(
      ([source, surveyUnitData, metadata]) => {
        return { source, surveyUnitData, metadata, nomenclature }
      }
    )
  },
  errorComponent: ({ error, reset }) => (
    <ErrorComponent error={error} reset={reset} redirectTo="visualizeForm" />
  ),
  pendingComponent: ContentSkeleton,
})
