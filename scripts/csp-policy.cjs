'use strict'

function getOrigin(value) {
  if (!value || value.startsWith('/')) {
    return undefined
  }

  return new URL(value).origin
}

function createCspPolicy(env, hmrPort, isDev) {
  const trustedDomains = (env.VITE_TRUST_URI_DOMAINS ?? '')
    .split(',')
    .map((domain) => domain.trim())
    .filter(Boolean)
    .flatMap((domain) => [domain, `*.${domain}`])

  const connectSources = [
    "'self'",
    ...(isDev ? [`ws://localhost:${hmrPort}`] : []),
    getOrigin(env.VITE_API_URL),
    getOrigin(env.VITE_OIDC_ISSUER),
    ...trustedDomains,
  ].filter((source) => source !== undefined)

  const frameSources = ["'self'", getOrigin(env.VITE_OIDC_ISSUER)].filter(
    (source) => source !== undefined,
  )

  return {
    'default-src': ["'self'"],
    'base-uri': ["'self'"],
    'object-src': ["'none'"],
    'script-src': ["'self'", "'unsafe-eval'"],
    'script-src-elem': ["'self'", "'unsafe-inline'"],
    'script-src-attr': ["'none'"],
    'style-src': ["'self'"],
    'style-src-elem': ["'self'", "'unsafe-inline'"],
    'style-src-attr': ["'unsafe-inline'"],
    'img-src': ["'self'", 'data:'],
    'font-src': ["'self'"],
    'worker-src': ["'self'", 'blob:'],
    'connect-src': Array.from(new Set(connectSources)),
    'frame-src': Array.from(new Set(frameSources)),
  }
}

exports.createCspPolicy = createCspPolicy
