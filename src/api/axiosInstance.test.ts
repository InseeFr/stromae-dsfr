import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/oidc', () => ({
  getOidc: vi.fn().mockResolvedValue({ isUserLoggedIn: false }),
}))

describe('axiosInstance', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_TRUST_URI_DOMAINS', 'localhost')
    vi.resetModules()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('rejects requests from untrusted domains', async () => {
    const { visualizeAxiosInstance } = await import('@/api/axiosInstance')

    await expect(
      visualizeAxiosInstance.get('https://not-trusted.com/data'),
    ).rejects.toThrow(
      'Request to untrusted domain: https://not-trusted.com/data',
    )
  })

  it('allows requests to trusted domain', async () => {
    const { visualizeAxiosInstance } = await import('@/api/axiosInstance')
    const mockAdapter = vi.fn().mockResolvedValue({
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    })
    visualizeAxiosInstance.defaults.adapter = mockAdapter

    await visualizeAxiosInstance.get('http://localhost/api/data')

    expect(mockAdapter).toHaveBeenCalled()
  })
})
