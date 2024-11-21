import { useTelemetry } from '@/contexts/TelemetryContext'
import { useOidc } from '@/oidc'
import { accessibilityRoute } from '@/pages/Accessibility/route'
import { collectRoute } from '@/pages/Collect/route'
import { legalsRoute } from '@/pages/Legals/route'
import { navigationAssistanceRoute } from '@/pages/NavigationAssistance/route'
import { reviewRoute } from '@/pages/Review/route'
import { securityRoute } from '@/pages/Security/route'
import { siteMapRoute } from '@/pages/SiteMap/route'
import { visualizeRoute } from '@/pages/Visualize/route'
import { ErrorComponent } from '@/shared/components/Error/ErrorComponent'
import { AutoLogoutCountdown } from '@/shared/components/Layout/AutoLogoutCountdown'
import { Footer } from '@/shared/components/Layout/Footer'
import { Header } from '@/shared/components/Layout/Header'
import { NotFoundError } from '@/shared/error/notFoundError'
import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from '@tanstack/react-router'
import { decodeJwt } from 'oidc-spa/tools/decodeJwt'
import { memo, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

// eslint-disable-next-line react-refresh/only-export-components
const RootComponent = memo(() => {
  const { oidcTokens } = useOidc()
  const { isTelemetryDisabled, setDefaultValues } = useTelemetry()
  const [sid, setSID] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (import.meta.env.VITE_OIDC_ENABLED === 'false') {
      // mock
      setSID(oidcTokens?.decodedIdToken.sid)
    } else {
      setSID(oidcTokens ? decodeJwt(oidcTokens?.idToken)?.sid : undefined)
    }
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
