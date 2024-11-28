import { rootRoute } from '@/router/router'
import { createRoute } from '@tanstack/react-router'
import { SecurityPage } from './SecurityPage'

export const securitePath = '/securite'

export const securityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: securitePath,
  component: SecurityPage,
  loader: () => {
    //TODO get name (Filière d'Enquête) in metadata
    document.title = "Sécurité | Filière d'Enquête"
  },
})
