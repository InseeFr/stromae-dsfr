import { getOidc } from '@/oidc'

export async function protectedRouteLoader(
  extraQueryParams?: Record<string, string>
) {
  const oidc = await getOidc()

  if (oidc.isUserLoggedIn) {
    return null
  }

  await oidc.login({
    doesCurrentHrefRequiresAuth: true,
    extraQueryParams,
  })
}
