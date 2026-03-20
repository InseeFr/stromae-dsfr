import { createRoute } from '@tanstack/react-router'

import { rootRoute } from '@/router/router'

import { DeconnexionPage } from './DeconnexionPage'

export const deconnexionPath = '/deconnexion'

export const deconnexionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: deconnexionPath,
  component: DeconnexionPage,
  loader: () => {
    document.title = "Déconnexion | Filière d'Enquête"
  },
})
