import { SAVE_STATUS } from '@/constants/saveStatus'

import { getSaveBadgeLabel } from './saveStatus'

describe('getSaveBadgeLabel', () => {
  it('returns no config when the status is idle', () => {
    expect(getSaveBadgeLabel(SAVE_STATUS.IDLE)).toBeUndefined()
  })

  it('returns a grey badge config for the saving status', () => {
    expect(getSaveBadgeLabel(SAVE_STATUS.SAVING)).toEqual({
      severity: undefined,
      labelKey: 'collectPage.saveStatus.savingLabel',
      ariaLabelKey: 'collectPage.saveStatus.savingAriaLabel',
    })
  })

  it('returns a green badge config for the saved status', () => {
    expect(getSaveBadgeLabel(SAVE_STATUS.SAVED)).toEqual({
      severity: 'success',
      labelKey: 'collectPage.saveStatus.savedLabel',
      ariaLabelKey: 'collectPage.saveStatus.savedAriaLabel',
    })
  })

  it('returns a red badge config for the error status', () => {
    expect(getSaveBadgeLabel(SAVE_STATUS.ERROR)).toEqual({
      severity: 'error',
      labelKey: 'collectPage.saveStatus.errorLabel',
      ariaLabelKey: 'collectPage.saveStatus.errorAriaLabel',
    })
  })
})
