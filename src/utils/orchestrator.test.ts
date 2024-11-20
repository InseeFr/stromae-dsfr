import { PAGE_TYPE } from '@/constants/page'

import { hasBeenSent, shouldDisplayWelcomeModal } from './orchestrator'

test('has been sent', () => {
  expect(hasBeenSent()).toBeFalsy()
  expect(hasBeenSent('INIT')).toBeFalsy()
  expect(hasBeenSent('COMPLETED')).toBeTruthy()
  expect(hasBeenSent('VALIDATED')).toBeTruthy()
  expect(hasBeenSent('TOEXTRACT')).toBeTruthy()
  expect(hasBeenSent('EXTRACTED')).toBeTruthy()
})

test('should display welcome modal', () => {
  // never accessed next page
  expect(shouldDisplayWelcomeModal(undefined, PAGE_TYPE.WELCOME)).toBeFalsy()
  expect(shouldDisplayWelcomeModal('INIT', PAGE_TYPE.WELCOME)).toBeFalsy()
  expect(shouldDisplayWelcomeModal('INIT')).toBeFalsy()

  // currently answering
  expect(shouldDisplayWelcomeModal('INIT', '2')).toBeTruthy()
  expect(shouldDisplayWelcomeModal('INIT', '1.3#2')).toBeTruthy()
  expect(shouldDisplayWelcomeModal('INIT', PAGE_TYPE.VALIDATION)).toBeTruthy()

  // form sent
  expect(shouldDisplayWelcomeModal('COMPLETED', PAGE_TYPE.END)).toBeFalsy()
  expect(shouldDisplayWelcomeModal('VALIDATED', PAGE_TYPE.END)).toBeFalsy()
  expect(shouldDisplayWelcomeModal('TOEXTRACT', PAGE_TYPE.END)).toBeFalsy()
  expect(shouldDisplayWelcomeModal('EXTRACTED', PAGE_TYPE.END)).toBeFalsy()
})
