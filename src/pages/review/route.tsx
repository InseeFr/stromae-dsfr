import type { LunaticSource } from '@inseefr/lunatic'
import { createRoute } from '@tanstack/react-router'

import { getGetQuestionnaireDataQueryOptions } from '@/api/03-questionnaires'
import {
  getGetInterrogationByIdQueryOptions,
  getGetInterrogationMetadataByIdQueryOptions,
} from '@/api/06-interrogations'
import { ContentSkeleton } from '@/components/ContentSkeleton'
import { ErrorComponent } from '@/components/error/ErrorComponent'
import { protectedRouteLoader } from '@/loader/protectedLoader'
import type { SurveyUnit } from '@/models/surveyUnit'
import { rootRoute } from '@/router/router'
import { metadataStore } from '@/stores/metadataStore'
import { convertOldPersonalization } from '@/utils/convertOldPersonalization'

import { ReviewPage } from './ReviewPage'

export const reviewPath =
  '/review/questionnaire/$questionnaireId/unite-enquetee/$surveyUnitId'

export const reviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: reviewPath,
  component: ReviewPage,
  beforeLoad: async () =>
    protectedRouteLoader({
      kc_idp_hint: import.meta.env.VITE_REVIEW_IDENTITY_PROVIDER,
    }),
  loader: ({
    params: { questionnaireId, surveyUnitId },
    context: { queryClient },
    abortController,
  }) => {
    const sourcePr = queryClient
      .ensureQueryData(
        getGetQuestionnaireDataQueryOptions(questionnaireId, {
          request: { signal: abortController.signal },
        }),
      )
      .then((e) => e as unknown as LunaticSource) // We'd like to use zod, but the files are heavy.

    const surveyUnitPr = queryClient.ensureQueryData(
      getGetInterrogationByIdQueryOptions(surveyUnitId, {
        request: { signal: abortController.signal },
      }),
    ) as SurveyUnit

    const metadataPr = queryClient
      .ensureQueryData(
        getGetInterrogationMetadataByIdQueryOptions(surveyUnitId, {
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
          surveyUnitInfo: convertOldPersonalization(metadata.personalization),
        })
      })

    return Promise.all([sourcePr, surveyUnitPr, metadataPr]).then(
      ([source, surveyUnit, metadata]) => ({
        source,
        surveyUnit,
        metadata,
      }),
    )
  },
  errorComponent: ({ error }) => {
    return <ErrorComponent error={error} redirectTo={undefined} />
  },
  pendingComponent: ContentSkeleton,
})
