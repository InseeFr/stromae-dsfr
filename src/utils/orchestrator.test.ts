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
  expect(shouldDisplayWelcomeModal(undefined, 'welcomePage')).toBeFalsy()
  expect(shouldDisplayWelcomeModal('INIT', 'welcomePage')).toBeFalsy()
  expect(shouldDisplayWelcomeModal('INIT')).toBeFalsy()

  // currently answering
  expect(shouldDisplayWelcomeModal('INIT', '2')).toBeTruthy()
  expect(shouldDisplayWelcomeModal('INIT', '1.3#2')).toBeTruthy()
  expect(shouldDisplayWelcomeModal('INIT', 'validationPage')).toBeTruthy()

  // form sent
  expect(shouldDisplayWelcomeModal('COMPLETED', 'endPage')).toBeFalsy()
  expect(shouldDisplayWelcomeModal('VALIDATED', 'endPage')).toBeFalsy()
  expect(shouldDisplayWelcomeModal('TOEXTRACT', 'endPage')).toBeFalsy()
  expect(shouldDisplayWelcomeModal('EXTRACTED', 'endPage')).toBeFalsy()
})
