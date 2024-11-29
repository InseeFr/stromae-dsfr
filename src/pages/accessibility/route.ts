import { createRoute } from '@tanstack/react-router'

import { rootRoute } from '@/router/router'

import { AccessibilityPage } from './AccessibilityPage'

export const accessibilityPath = '/accessibilite'

export const accessibilityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: accessibilityPath,
  component: AccessibilityPage,
  loader: () => {
    //TODO get name (Filière d'Enquête) in metadata
    document.title = "Accessibilité | Filière d'Enquête"
  },
})
