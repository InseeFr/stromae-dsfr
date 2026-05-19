import axios, { type AxiosRequestConfig } from 'axios'

import { getOidc } from '@/oidc'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const getAccessToken = async () => {
  const oidc = await getOidc()

  if (!oidc.isUserLoggedIn) return undefined

  return await oidc.getAccessToken()
}

// Type issue https://github.com/axios/axios/issues/5494
const onRequest = async (config: any) => ({
  ...config,
  headers: {
    ...config.headers,
    'Content-Type': 'application/json;charset=utf-8',
    Accept: 'application/json;charset=utf-8',
    ...(await (async () => {
      const accessToken = await getAccessToken()

      if (!accessToken) {
        return undefined
      }

      return {
        Authorization: `Bearer ${accessToken}`,
      }
    })()),
  },
})

axiosInstance.interceptors.request.use(onRequest)

const trustedDomains: string[] = (import.meta.env.VITE_TRUST_URI_DOMAINS ?? '')
  .split(',')
  .map((d: string) => d.trim())
  .filter(Boolean)

const isUriAuthorized = (url: string): boolean => {
  try {
    const { hostname } = new URL(url)
    return trustedDomains.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
    )
  } catch {
    return false
  }
}

const onDomainCheck = (config: any) => {
  if (!isUriAuthorized(config.url ?? '')) {
    return Promise.reject(
      new Error(`Request to untrusted domain: ${config.url}`),
    )
  }
  return config
}

//We use a custom instance for visualization mode because we do not need the baseUrl
export const visualizeAxiosInstance = axios.create()
visualizeAxiosInstance.interceptors.request.use(onRequest)
visualizeAxiosInstance.interceptors.request.use(onDomainCheck)

// add a second `options` argument here if you want to pass extra options to each generated query
export const stromaeInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
) => {
  return axiosInstance<T>({
    ...config,
    ...options,
  }).then(({ data }) => data)
}

//We use a customInstance for depositProof because we need response headers to get fileName.
export const depositProofInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
) => {
  return axiosInstance<T>({
    ...config,
    ...options,
  })
}
