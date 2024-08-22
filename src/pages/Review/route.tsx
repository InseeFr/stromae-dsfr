import type { LunaticSource } from '@inseefr/lunatic'
import { createRoute } from '@tanstack/react-router'
import { getGetQuestionnaireDataQueryOptions } from 'api/03-questionnaires'
import {
  getGetSurveyUnitByIdQueryOptions,
  getGetSurveyUnitMetadataByIdQueryOptions,
} from 'api/06-survey-units'
import type { SurveyUnitData } from 'model/SurveyUnitData'
import { rootRoute } from 'router/router'
import { ContentSkeleton } from 'shared/components/ContentSkeleton'
import { ErrorComponent } from 'shared/components/Error/ErrorComponent'
import { protectedRouteLoader } from 'shared/loader/protectedLoader'
import { metadataStore } from 'shared/metadataStore/metadataStore'
import { convertOldPersonalization } from 'utils/convertOldPersonalization'
import { ReviewPage } from './ReviewPage'

export const reviewPath =
  'review/questionnaire/$questionnaireId/unite-enquetee/$surveyUnitId'

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
        })
      )
      .then((e) => e as unknown as LunaticSource) // We'd like to use zod, but the files are heavy.

    const surveyUnitDataPr = queryClient
      .ensureQueryData(
        getGetSurveyUnitByIdQueryOptions(surveyUnitId, {
          request: { signal: abortController.signal },
        })
      )
      .then((suData) => suData as SurveyUnitData) // data are heavy too

    const metadataPr = queryClient
      .ensureQueryData(
        getGetSurveyUnitMetadataByIdQueryOptions(surveyUnitId, {
          request: { signal: abortController.signal },
        })
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

    return Promise.all([sourcePr, surveyUnitDataPr, metadataPr]).then(
      ([source, surveyUnitData, metadata]) => ({
        source,
        surveyUnitData,
        metadata,
      })
    )
  },
  errorComponent: ({ error }) => {
    return <ErrorComponent error={error} redirectTo={undefined} />
  },
  pendingComponent: ContentSkeleton,
})
