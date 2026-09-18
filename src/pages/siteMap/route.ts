import { createRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { rootRoute } from '@/router/router'

import { SiteMapPage } from './SiteMapPage'

const siteMapSearchSchema = z
  .object({
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
    interrogationId: search?.interrogationId,
  }),
  loader: async ({ deps }) => {
    document.title = "Plan du site | Filière d'Enquête"

    return {
      interrogationId: deps.interrogationId,
    }
  },
})
