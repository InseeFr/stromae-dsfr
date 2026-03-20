/**
 * Check if multimode is enabled
 */
export function hasMultimode(): boolean {
  return (
    import.meta.env.VITE_MULTIMODE_ENABLED === '1' ||
    import.meta.env.VITE_MULTIMODE_ENABLED === 'true'
  )
}

function getBasePath(): string {
  const baseEnv = import.meta.env.VITE_BASE_PATH
  if (baseEnv.startsWith('/')) return baseEnv
  return `/${baseEnv}`
}

/**
 * Base path of app, ensure that base path starts by '/'
 */
export const BASE_PATH = getBasePath()
