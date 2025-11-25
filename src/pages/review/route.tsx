import type { LunaticSource } from '@inseefr/lunatic'
import { createRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { getGetQuestionnaireDataQueryOptions } from '@/api/03-questionnaires'
import {
  getGetInterrogationByIdQueryOptions,
  getGetInterrogationMetadataByIdQueryOptions,
} from '@/api/06-interrogations'
import { ContentSkeleton } from '@/components/ContentSkeleton'
import { ErrorComponent } from '@/components/error/ErrorComponent'
import { protectedRouteLoader } from '@/loader/protectedLoader'
import type { Interrogation } from '@/models/interrogation'
import { rootRoute } from '@/router/router'
import { metadataStore } from '@/stores/metadataStore'
import { convertOldPersonalization } from '@/utils/convertOldPersonalization'

import { ReviewPage } from './ReviewPage'

const reviewSearchParams = z.object({
  surveyUnitCompositeName: z.string().optional(),
})

export const reviewPath = '/review/interrogations/$interrogationId'

export const reviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: reviewPath,
  component: ReviewPage,
  beforeLoad: async () =>
    protectedRouteLoader({
      kc_idp_hint: import.meta.env.VITE_REVIEW_IDENTITY_PROVIDER,
    }),
  validateSearch: reviewSearchParams,
  loader: async ({
    params: { interrogationId },
    context: { queryClient },
    abortController,
  }) => {
    const interrogation = (await queryClient.ensureQueryData(
      getGetInterrogationByIdQueryOptions(interrogationId, {
        request: { signal: abortController.signal },
      }),
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
        document.title =
          metadata.label ?? "Relecture questionnaire | Filière d'Enquête"

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
  errorComponent: ({ error }) => {
    return <ErrorComponent error={error} redirectTo={undefined} />
  },
  pendingComponent: ContentSkeleton,
})
