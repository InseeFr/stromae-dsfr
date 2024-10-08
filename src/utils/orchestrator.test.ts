import { shouldDisplayWelcomeModal } from './orchestrator'

test('should display welcome modal', () => {
  // never accessed next page
  expect(shouldDisplayWelcomeModal(undefined, 'welcomePage')).toBeFalsy()
  expect(shouldDisplayWelcomeModal('INIT', 'welcomePage')).toBeFalsy()
  expect(shouldDisplayWelcomeModal('INIT', undefined)).toBeFalsy()

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
