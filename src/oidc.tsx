import { oidcSpa } from 'oidc-spa/react-spa'
import { z } from 'zod'

const decodedIdTokenSchema = z.object({
  sid: z.string(),
  sub: z.string(),
  preferred_username: z.string(),
})

const autoLogoutParams =
  import.meta.env.VITE_AUTO_LOGOUT_REDIRECTION === 'true'
    ? {
        redirectTo: 'specific url' as const,
        url: `${import.meta.env.VITE_PORTAIL_URL}${import.meta.env.VITE_LOGOUT_PATH}`,
      }
    : { redirectTo: 'current page' as const }

export const { bootstrapOidc, getOidc, useOidc } = oidcSpa
  .withExpectedDecodedIdTokenShape({
    decodedIdTokenSchema: decodedIdTokenSchema,
  })
  .createUtils()

bootstrapOidc(
  import.meta.env.VITE_OIDC_ENABLED === 'true'
    ? {
        implementation: 'real',
        // Configure your OIDC provider in `.env.local`
        clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
        issuerUri: import.meta.env.VITE_OIDC_ISSUER,
        autoLogoutParams: autoLogoutParams,
        // Enable for detailed initialization and token lifecycle logs.
        debugLogs: true,
        warnUserSecondsBeforeAutoLogout: 60,
      }
    : {
        // Mock mode: no requests to an auth server are made.
        implementation: 'mock',
        isUserInitiallyLoggedIn: true,
        decodedIdToken_mock: {
          sid: `mock-${globalThis.crypto.randomUUID()}`,
          sub: 'mock-sub',
          preferred_username: 'mock-user',
        },
      },
)
