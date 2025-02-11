import type { LunaticSource } from '@inseefr/lunatic'
import { createRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { getGetQuestionnaireDataQueryOptions } from '@/api/03-questionnaires'
import {
  getGetSurveyUnitMetadataByIdQueryOptions,
  getSurveyUnitById,
} from '@/api/06-survey-units'
import { ContentSkeleton } from '@/components/ContentSkeleton'
import { ErrorComponent } from '@/components/error/ErrorComponent'
import { protectedRouteLoader } from '@/loader/protectedLoader'
import type { SurveyUnitData } from '@/models/SurveyUnitData'
import { rootRoute } from '@/router/router'
import { metadataStore } from '@/stores/metadataStore'
import { convertOldPersonalization } from '@/utils/convertOldPersonalization'

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
  loader: async ({
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

    //We don't need the cache from react-query for data that changed too often and need to be fresh
    const surveyUnitDataPr = getSurveyUnitById(
      surveyUnitId,
      undefined,
      abortController.signal,
    ).then((suData) => suData as SurveyUnitData) // data are heavy too

    const metadataPr = queryClient
      .ensureQueryData(
        getGetSurveyUnitMetadataByIdQueryOptions(surveyUnitId, {
          request: { signal: abortController.signal },
        }),
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
      }),
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
