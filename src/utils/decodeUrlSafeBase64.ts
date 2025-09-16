/**
 * Decodes a url-safe-Base64-encoded query parameter into a UTF-8 string.
 * Returns the given fallback value if decoding fails.
 */
export function decodeUrlSafeBase64(
  encodedValue?: string,
  fallbackValue = '',
): string | undefined {
  if (!encodedValue) return ''

  // Normalize: convert URL-safe Base64 → standard Base64
  let base64Value = encodedValue.replace(/-/g, '+').replace(/_/g, '/')

  // Add padding if missing
  while (base64Value.length % 4 !== 0) base64Value += '='

  try {
    // Convert base64 → UTF-8 string
    return new TextDecoder().decode(
      Uint8Array.from(atob(base64Value), (c) => c.charCodeAt(0)),
    )
  } catch (err) {
    console.error('Failed to base64 decode param:', encodedValue, err)
    return fallbackValue
  }
}
