/**
 * Check if multimode is enabled
 */
export function hasMultimode(): boolean {
  return (
    import.meta.env.VITE_MULTIMODE_ENABLED === '1' ||
    import.meta.env.VITE_MULTIMODE_ENABLED === 'true'
  )
}
