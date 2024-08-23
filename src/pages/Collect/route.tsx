import type { LunaticSource } from '@inseefr/lunatic'
import { createRoute } from '@tanstack/react-router'
import { getGetQuestionnaireDataQueryOptions } from 'api/03-questionnaires'
import {
  getGetSurveyUnitMetadataByIdQueryOptions,
  getSurveyUnitById,
} from 'api/06-survey-units'
import type { SurveyUnitData } from 'model/SurveyUnitData'
import { rootRoute } from 'router/router'
import { ContentSkeleton } from 'shared/components/ContentSkeleton'
import { ErrorComponent } from 'shared/components/Error/ErrorComponent'
import { protectedRouteLoader } from 'shared/loader/protectedLoader'
import { metadataStore } from 'shared/metadataStore/metadataStore'
import { convertOldPersonalization } from 'utils/convertOldPersonalization'
import { z } from 'zod'
import { CollectPage } from './CollectPage'

const collectSearchParams = z.object({
  pathLogout: z.string().optional(),
  pathAssistance: z.string().optional(),
})

export const collectPath =
  '/questionnaire/$questionnaireId/unite-enquetee/$surveyUnitId'

export const collectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: collectPath,
  component: CollectPage,
  beforeLoad: async () => protectedRouteLoader(),
  validateSearch: collectSearchParams,
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

    //We don't need the cache from react-query for data that changed too often and need to be fresh
    const surveyUnitDataPr = getSurveyUnitById(
      surveyUnitId,
      undefined,
      abortController.signal
    ).then((suData) => suData as SurveyUnitData) // data are heavy too

    const metadataPr = queryClient
      .ensureQueryData(
        getGetSurveyUnitMetadataByIdQueryOptions(surveyUnitId, {
          request: { signal: abortController.signal },
        })
      )
      .then((metadata) => {
        document.title = metadata.label ?? "Questionnaire | Filière d'Enquête"

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
  // Do not cache this route's data after it's unloaded
  gcTime: 0,
  //Show pendingComponent directly
  pendingMs: 0,
  errorComponent: ({ error }) => {
    return <ErrorComponent error={error} redirectTo="portal" />
  },
  pendingComponent: ContentSkeleton,
})
