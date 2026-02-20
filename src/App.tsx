import { MuiDsfrThemeProvider } from '@codegouvfr/react-dsfr/mui'
import { startReactDsfr } from '@codegouvfr/react-dsfr/spa'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  Link,
  type LinkProps,
  RouterProvider,
  createRouter,
} from '@tanstack/react-router'

import { TelemetryProvider } from '@/contexts/TelemetryContext'
import { routeTree } from '@/router/router'

import { BASE_PATH } from './utils/env'

startReactDsfr({
  defaultColorScheme: 'system',
  Link,
})

declare module '@codegouvfr/react-dsfr/spa' {
  interface RegisterLink {
    Link: (props: LinkProps) => React.JSX.Element
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      networkMode: 'always',
    },
  },
})

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

/** Wraps and inits the providers used in the app */
export function App() {
  return (
    <MuiDsfrThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TelemetryProvider>
          <RouterProvider router={router} basepath={BASE_PATH} />
        </TelemetryProvider>
      </QueryClientProvider>
    </MuiDsfrThemeProvider>
  )
}
