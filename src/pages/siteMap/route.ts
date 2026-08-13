import { createRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { getGetInterrogationByIdQueryOptions } from '@/api/06-interrogations'
import { rootRoute } from '@/router/router'

import { SiteMapPage } from './SiteMapPage'

const siteMapSearchSchema = z
  .object({
    questionnaireId: z.string().optional(),
    interrogationId: z.string().optional(),
  })
  .optional()

export const siteMapPath = '/plan-du-site'
export const siteMapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: siteMapPath,
  component: SiteMapPage,
  validateSearch: siteMapSearchSchema,
  loaderDeps: ({ search }) => ({
    questionnaireId: search?.questionnaireId,
    interrogationId: search?.interrogationId,
  }),
  loader: async ({ deps, context: { queryClient }, abortController }) => {
    document.title = "Plan du site | Filière d'Enquête"

    let questionnaireId = deps.questionnaireId

    if (!questionnaireId && deps.interrogationId) {
      const interrogation = await queryClient.ensureQueryData(
        getGetInterrogationByIdQueryOptions(deps.interrogationId, {
          request: { signal: abortController.signal },
        }),
      )
      questionnaireId = interrogation.questionnaireId
    }

    return { questionnaireId }
  },
})
