import { rootRoute } from '@/router/router'
import { createRoute } from '@tanstack/react-router'
import { SiteMapPage } from './SiteMapPage'

export const siteMapPath = '/plan-du-site'
export const siteMapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: siteMapPath,
  component: SiteMapPage,
  loader: () => {
    document.title = "Plan du site | Filière d'Enquête"
  },
})
