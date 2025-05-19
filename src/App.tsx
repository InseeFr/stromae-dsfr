import { createDsfrCustomBrandingProvider } from '@codegouvfr/react-dsfr/mui'
import { startReactDsfr } from '@codegouvfr/react-dsfr/spa'
import { createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  Link,
  type LinkProps,
  RouterProvider,
  createRouter,
} from '@tanstack/react-router'

import logoInseePngUrl from '@/assets/logo-insee.png'
import { TelemetryProvider } from '@/contexts/TelemetryContext'
import { OidcProvider } from '@/oidc'
import { routeTree } from '@/router/router'

startReactDsfr({
  defaultColorScheme: 'system',
  Link,
})

const { DsfrCustomBrandingProvider } = createDsfrCustomBrandingProvider({
  createMuiTheme: ({ isDark, theme_gov }) => {
    if (import.meta.env.VITE_IS_GOV_INSTANCE === 'true') {
      return { theme: theme_gov }
    }

    const theme = createTheme({
      palette: {
        mode: isDark ? 'dark' : 'light',
        primary: {
          main: isDark ? '#02AFFF' : '#3467AE',
        },
        secondary: {
          main: '#FFC403',
        },
      },
      typography: {
        fontFamily: '"Geist"',
      },
    })

    return { theme, faviconUrl: logoInseePngUrl }
  },
})

declare module '@codegouvfr/react-dsfr/spa' {
  interface RegisterLink {
    Link: (props: LinkProps) => JSX.Element
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
    <DsfrCustomBrandingProvider>
      <QueryClientProvider client={queryClient}>
        <OidcProvider>
          <TelemetryProvider>
            <RouterProvider
              router={router}
              basepath={import.meta.env.VITE_BASE_PATH}
            />
          </TelemetryProvider>
        </OidcProvider>
      </QueryClientProvider>
    </DsfrCustomBrandingProvider>
  )
}
