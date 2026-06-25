import { AxiosError } from 'axios'

import { isBlockingApiError } from './blockingError'

const mockAxiosError = (statuts: number) =>
  new AxiosError('Conflict', 'ERR_BAD_REQUEST', undefined, undefined, {
    data: {
      message: "We don't care",
    },
    status: statuts,
    statusText: `Error HTTP ${statuts}`,
    headers: {},
    config: {} as any,
  })

describe('Blocking API error during questionnaire completion', () => {
  it('should return true for 409 axios error', () => {
    const axios409 = mockAxiosError(409)
    expect(isBlockingApiError(axios409)).toBeTruthy()
  })

  it('should return false for 500, 404, 403, 401 axios error', () => {
    const axios500 = mockAxiosError(500)
    const axios404 = mockAxiosError(404)
    const axios403 = mockAxiosError(403)
    const axios401 = mockAxiosError(401)
    expect(isBlockingApiError(axios500)).toBeFalsy()
    expect(isBlockingApiError(axios404)).toBeFalsy()
    expect(isBlockingApiError(axios403)).toBeFalsy()
    expect(isBlockingApiError(axios401)).toBeFalsy()
  })
})
