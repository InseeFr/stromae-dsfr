import type { LunaticSource } from '@inseefr/lunatic'
import { createRoute } from '@tanstack/react-router'
import { getGetQuestionnaireDataQueryOptions } from 'api/03-questionnaires'
import {
  getGetSurveyUnitByIdQueryOptions,
  getGetSurveyUnitMetadataByIdQueryOptions,
} from 'api/06-survey-units'
import type { SurveyUnitData } from 'model/SurveyUnitData'
import { rootRoute } from 'router/router'
import { ErrorComponent } from 'shared/components/Error/ErrorComponent'
import { protectedRouteLoader } from 'shared/loader/protectedLoader'
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
  beforeLoad: protectedRouteLoader,
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

    const surveyUnitDataPr = queryClient
      .ensureQueryData(
        getGetSurveyUnitByIdQueryOptions(surveyUnitId, {
          request: { signal: abortController.signal },
        })
      )
      .then((suData) => suData as SurveyUnitData) // data are heavy too

    const metadataPr = queryClient.ensureQueryData(
      getGetSurveyUnitMetadataByIdQueryOptions(surveyUnitId, {
        request: { signal: abortController.signal },
      })
    )

    return Promise.all([sourcePr, surveyUnitDataPr, metadataPr]).then(
      ([source, surveyUnitData, metadata]) => ({
        source,
        surveyUnitData,
        metadata,
      })
    )
  },
  errorComponent: ({ error }) => {
    return <ErrorComponent error={error} redirectTo="portal" />
  },
})
