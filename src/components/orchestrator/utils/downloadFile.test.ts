import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { downloadAsCsv, downloadAsJson } from './downloadFile'

describe('downloadFile utilities', () => {
  beforeEach(() => {
    vi.spyOn(document, 'createElement')
    vi.spyOn(document.body, 'appendChild')
    vi.spyOn(document.body, 'removeChild')
    vi.spyOn(URL, 'createObjectURL')
    vi.spyOn(URL, 'revokeObjectURL')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('downloadAsJson', () => {
    it('should create a Blob and trigger a download', () => {
      const dataToDownload = { key: 'value' }
      const filename = 'test.json'

      downloadAsJson({ dataToDownload, filename })

      expect(document.createElement).toHaveBeenCalledWith('a')
      expect(document.body.appendChild).toHaveBeenCalled()
      expect(document.body.removeChild).toHaveBeenCalled()
      expect(URL.createObjectURL).toHaveBeenCalled()
      expect(URL.revokeObjectURL).toHaveBeenCalled()
    })

    it('should log an error if no data is provided', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error')
      downloadAsJson({ dataToDownload: null as any })
      expect(consoleErrorSpy).toHaveBeenCalledWith('No data to download.')
      consoleErrorSpy.mockRestore()
    })
  })

  describe('downloadAsCsv', () => {
    it('should create a Blob and trigger a download (CSV)', () => {
      const dataToDownload = 'col1,col2\nval1,val2'
      const filename = 'test.csv'
      downloadAsCsv({ dataToDownload, filename })

      expect(document.createElement).toHaveBeenCalledWith('a')
      expect(document.body.appendChild).toHaveBeenCalled()
      expect(document.body.removeChild).toHaveBeenCalled()
      expect(URL.createObjectURL).toHaveBeenCalled()
      expect(URL.revokeObjectURL).toHaveBeenCalled()
    })
  })
})
