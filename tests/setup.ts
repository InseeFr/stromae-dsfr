import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

window.URL.createObjectURL = function () {
  return ''
}

window.URL.revokeObjectURL = function () {
  return ''
}

afterEach(() => {
  cleanup()
})
