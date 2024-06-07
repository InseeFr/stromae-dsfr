import { createRoute } from '@tanstack/react-router'
import { rootRoute } from 'router/router'
import { LegalPage } from './LegalsPage'

export const legalsPath = '/mentions-legales'

export const legalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: legalsPath,
  component: LegalPage,
  loader: () => {
    //TODO get name (Filière d'Enquête) in metadata
    document.title = "Mentions Légales | Filière d'Enquête"
  },
})
