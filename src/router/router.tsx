import { memo, useEffect, useState } from 'react'

import type { QueryClient } from '@tanstack/react-query'
import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { decodeJwt } from 'oidc-spa/tools/decodeJwt'
import { Toaster } from 'react-hot-toast'

import { ErrorComponent } from '@/components/error/ErrorComponent'
import { NotFoundError } from '@/components/error/utils/notFoundError'
import { AutoLogoutCountdown } from '@/components/layout/AutoLogoutCountdown'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { useTelemetry } from '@/contexts/TelemetryContext'
import { useOidc } from '@/oidc'
import { accessibilityRoute } from '@/pages/accessibility/route'
import { collectRoute } from '@/pages/collect/route'
import { legalsRoute } from '@/pages/legals/route'
import { navigationAssistanceRoute } from '@/pages/navigationAssistance/route'
import { reviewRoute } from '@/pages/review/route'
import { securityRoute } from '@/pages/security/route'
import { siteMapRoute } from '@/pages/siteMap/route'
import { visualizeRoute } from '@/pages/visualize/route'

// eslint-disable-next-line react-refresh/only-export-components
const RootComponent = memo(() => {
  const { oidcTokens } = useOidc()
  const { isTelemetryDisabled, setDefaultValues } = useTelemetry()
  const [sid, setSID] = useState<string | undefined>(undefined)

  useEffect(() => {
    setSID(oidcTokens ? decodeJwt(oidcTokens?.idToken)?.sid : undefined)
  }, [oidcTokens])

  useEffect(() => {
    if (!isTelemetryDisabled && sid) {
      // Retrieve the OIDC's session id (different for each session of the user
      // agent used by the end-user which allows to identify distinct sessions)
      setDefaultValues({ sid })
    }
  }, [isTelemetryDisabled, sid, setDefaultValues])

  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Header />
      <main id="main" role="main">
        <Toaster />
        <ScrollRestoration />
        <Outlet />
      </main>
      <Footer />
      <AutoLogoutCountdown />
    </div>
  )
})

export const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  notFoundComponent: () => (
    <ErrorComponent error={new NotFoundError()} redirectTo="home" />
  ),
})

export const routeTree = rootRoute.addChildren([
  ...(import.meta.env.VITE_VISUALIZE_DISABLED === 'true'
    ? []
    : [visualizeRoute]),
  accessibilityRoute,
  securityRoute,
  siteMapRoute,
  legalsRoute,
  navigationAssistanceRoute,
  collectRoute,
  reviewRoute,
])
