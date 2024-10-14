import { OidcProvider } from '@/oidc'
import { routeTree } from '@/router/router'
import { MuiDsfrThemeProvider } from '@codegouvfr/react-dsfr/mui'
import { startReactDsfr } from '@codegouvfr/react-dsfr/spa'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  Link,
  RouterProvider,
  createRouter,
  type LinkProps,
} from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'

startReactDsfr({
  defaultColorScheme: 'system',
  Link,
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MuiDsfrThemeProvider>
      <QueryClientProvider client={queryClient}>
        <OidcProvider>
          <RouterProvider
            router={router}
            basepath={import.meta.env.VITE_BASE_PATH}
          />
        </OidcProvider>
      </QueryClientProvider>
    </MuiDsfrThemeProvider>
  </React.StrictMode>
)
