import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

window.URL.createObjectURL = function () {
  return ''
}

window.URL.revokeObjectURL = function () {
  return ''
}

vi.mock('@codegouvfr/react-dsfr/useIsDark', () => ({
  useIsDark: () => ({ isDark: false }),
}))

afterEach(() => {
  cleanup()
})
