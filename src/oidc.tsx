import { createMockReactOidc } from 'oidc-spa/mock/react'
import { createReactOidc } from 'oidc-spa/react'
import { z } from 'zod'

const decodedIdTokenSchema = z.object({
  sid: z.string(),
  sub: z.string(),
  preferred_username: z.string(),
})

const params = new URLSearchParams(window.location.search)

const autoLogoutParams = import.meta.env.VITE_AUTO_LOGOUT_REDIRECTION
  ? {
      redirectTo: 'specific url' as const,
      url: `${import.meta.env.VITE_PORTAIL_URL}${params.get('pathLogout') ?? ''}`,
    }
  : { redirectTo: 'current page' as const }

export const { OidcProvider, useOidc, getOidc } =
  import.meta.env.VITE_OIDC_ENABLED === 'false'
    ? createMockReactOidc({
        isUserInitiallyLoggedIn: false,
        mockedTokens: {
          decodedIdToken: {
            sid: `mock-${self.crypto.randomUUID()}`,
            sub: 'mock-sub',
            preferred_username: 'mock-user',
          } satisfies z.infer<typeof decodedIdTokenSchema>,
        },
      })
    : createReactOidc({
        clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
        issuerUri: import.meta.env.VITE_OIDC_ISSUER,
        publicUrl: import.meta.env.BASE_URL,
        autoLogoutParams,
        decodedIdTokenSchema,
      })
