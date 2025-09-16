import { describe, expect, it, vi } from 'vitest'

import { decodeUrlSafeBase64 } from './decodeUrlSafeBase64'

describe('decodeUrlSafeBase64', () => {
  it('should return empty string when input is undefined', () => {
    expect(decodeUrlSafeBase64(undefined)).toBe('')
  })

  it('should decode a valid base64-encoded string', () => {
    const encoded = 'VGVzdCZ+Iyd7Wy18YMOoX8OnXsOgQF19PSstKi8/w6nPgA=='
    expect(decodeUrlSafeBase64(encoded)).toBe("Test&~#'{[-|`è_ç^à@]}=+-*/?éπ")
  })

  it('should decode a valid URL-safe Base64 string', () => {
    const encoded = 'VGVzdCZ-Iyd7Wy18YMOoX8OnXsOgQF19PSstKi8_w6nPgA'
    expect(decodeUrlSafeBase64(encoded)).toBe("Test&~#'{[-|`è_ç^à@]}=+-*/?éπ")
  })

  it('should decode a valid base64-encoded UTF-8 string', () => {
    const encoded = 'RnJhbsOnYWlz'
    expect(decodeUrlSafeBase64(encoded)).toBe('Français')
  })

  it('should return fallback value if decoding fails, and log an error', () => {
    const spy = vi.spyOn(console, 'error')
    const invalidBase64 = '%%%not_base64%%%'
    expect(decodeUrlSafeBase64(invalidBase64, 'fallback value')).toBe(
      'fallback value',
    )
    expect(spy).toHaveBeenCalled()
  })
})
