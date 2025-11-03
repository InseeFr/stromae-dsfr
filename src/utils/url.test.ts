import { describe, expect, it, vi } from 'vitest'

import { createSafeUrl, decodeUrlSafeBase64 } from './url'

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

describe('createSafeUrl', () => {
  it('should concatenate origin and relative path with a slash', () => {
    expect(createSafeUrl('https://example.com', 'path')).toBe(
      'https://example.com/path',
    )
  })

  it('should not add double slashes if path already starts with /', () => {
    expect(createSafeUrl('https://example.com', '/about')).toBe(
      'https://example.com/about',
    )
  })

  it('should handle origin with trailing slash correctly', () => {
    expect(createSafeUrl('https://example.com/', 'test')).toBe(
      'https://example.com/test',
    )
  })

  it('should handle both origin and path with slashes correctly', () => {
    expect(createSafeUrl('https://example.com/', '/page')).toBe(
      'https://example.com/page',
    )
  })

  it('should return origin when path is undefined', () => {
    expect(createSafeUrl('https://example.com')).toBe('https://example.com')
  })

  it('should return origin with a trailing slash when path is empty string', () => {
    expect(createSafeUrl('https://example.com', '')).toBe('https://example.com')
  })

  it('should correctly join URL when path contains subdirectories', () => {
    expect(createSafeUrl('https://example.com', 'folder/sub')).toBe(
      'https://example.com/folder/sub',
    )
  })

  it('should not create new origin when path contain subdomain', () => {
    expect(createSafeUrl('https://example.com', 'munauty.hack.com')).not.toBe(
      'https://example.communauty.hack.com',
    )
    expect(createSafeUrl('https://example.com', 'munauty.hack.com')).toBe(
      'https://example.com/munauty.hack.com',
    )
  })
})
