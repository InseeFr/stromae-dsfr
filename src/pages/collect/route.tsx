import type { LunaticSource } from '@inseefr/lunatic'
import { createRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { getGetQuestionnaireDataQueryOptions } from '@/api/03-questionnaires'
import {
  getGetInterrogationMetadataByIdQueryOptions,
  getInterrogationById,
} from '@/api/06-interrogations'
import { ContentSkeleton } from '@/components/ContentSkeleton'
import { ErrorComponent } from '@/components/error/ErrorComponent'
import { protectedRouteLoader } from '@/loader/protectedLoader'
import type { Interrogation } from '@/models/interrogation'
import { rootRoute } from '@/router/router'
import { metadataStore } from '@/stores/metadataStore'
import { convertOldPersonalization } from '@/utils/convertOldPersonalization'

import { CollectPage } from './CollectPage'

const collectSearchParams = z.object({
  pathAssistance: z.string().optional(),
})

export const collectPath = '/interrogations/$interrogationId'

export const collectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: collectPath,
  component: CollectPage,
  beforeLoad: async () => protectedRouteLoader(),
  validateSearch: collectSearchParams,
  loader: async ({
    params: { interrogationId },
    context: { queryClient },
    abortController,
  }) => {
    //We don't need the cache from react-query for data that changed too often and need to be fresh
    const interrogation = (await getInterrogationById(
      interrogationId,
      undefined,
      abortController.signal,
    )) as Interrogation

    if (!interrogation.questionnaireId) {
      throw new Error(
        `Missing questionnaireId in interrogation ${interrogationId}`,
      )
    }

    const sourcePr = queryClient
      .ensureQueryData(
        getGetQuestionnaireDataQueryOptions(interrogation.questionnaireId, {
          request: { signal: abortController.signal },
        }),
      )
      .then((e) => e as unknown as LunaticSource) // We'd like to use zod, but the files are heavy.

    const metadataPr = queryClient
      .ensureQueryData(
        getGetInterrogationMetadataByIdQueryOptions(interrogationId, {
          request: { signal: abortController.signal },
        }),
      )
      .then((metadata) => {
        document.title = metadata.label ?? "Questionnaire | Filière d'Enquête"

        return metadataStore.updateMetadata({
          ...metadata,
          mainLogo: metadata.logos?.main,
          secondariesLogo: metadata.logos?.secondaries,
          interrogationInfo: convertOldPersonalization(
            metadata.personalization,
          ),
        })
      })

    const [source, metadata] = await Promise.all([sourcePr, metadataPr])

    return {
      source,
      interrogation,
      metadata,
    }
  },
  // Do not cache this route's data after it's unloaded
  gcTime: 0,
  //Show pendingComponent directly
  pendingMs: 0,
  errorComponent: ({ error }) => {
    return <ErrorComponent error={error} redirectTo="portal" />
  },
  pendingComponent: ContentSkeleton,
})
