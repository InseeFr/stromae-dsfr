import { createRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { getInterrogationById } from '@/api/06-interrogations'
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
  loader: async ({ deps, abortController }) => {
    document.title = "Plan du site | Filière d'Enquête"

    let questionnaireId = deps.questionnaireId

    if (!questionnaireId && deps.interrogationId) {
      const interrogation = await getInterrogationById(
        deps.interrogationId,
        undefined,
        abortController.signal,
      )
      questionnaireId = interrogation.questionnaireId
    }

    return { questionnaireId }
  },
})
