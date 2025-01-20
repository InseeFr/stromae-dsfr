import { afterEach, describe, expect, it, vi } from 'vitest'

import { downloadAsJson } from './downloadAsJson'

describe('downloadAsJson', () => {
  const createElementSpy = vi.spyOn(document, 'createElement')
  const appendChildSpy = vi.spyOn(document.body, 'appendChild')
  const removeChildSpy = vi.spyOn(document.body, 'removeChild')
  const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL')
  const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL')

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should create a Blob and trigger a download', () => {
    const dataToDownload = { key: 'value' }
    const filename = 'test.json'

    downloadAsJson({ dataToDownload, filename })

    expect(createElementSpy).toHaveBeenCalledWith('a')
    expect(appendChildSpy).toHaveBeenCalled()
    expect(removeChildSpy).toHaveBeenCalled()
    expect(createObjectURLSpy).toHaveBeenCalled()
    expect(revokeObjectURLSpy).toHaveBeenCalled()

    const aElement = createElementSpy.mock.results[0].value
    expect(aElement.href).toBeTruthy()
    expect(aElement.download).toBe(filename)
  })

  it('should log an error if no data is provided', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error')

    downloadAsJson({ dataToDownload: null as any })

    expect(consoleErrorSpy).toHaveBeenCalledWith('No data to download.')
    expect(createElementSpy).not.toHaveBeenCalled()
    expect(appendChildSpy).not.toHaveBeenCalled()
    expect(removeChildSpy).not.toHaveBeenCalled()
    expect(createObjectURLSpy).not.toHaveBeenCalled()
    expect(revokeObjectURLSpy).not.toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })
})
