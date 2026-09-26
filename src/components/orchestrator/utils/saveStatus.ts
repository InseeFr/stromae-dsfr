import type { ComponentProps } from 'react'

import type { Badge } from '@codegouvfr/react-dsfr/Badge'

import { SAVE_STATUS } from '@/constants/saveStatus'

type SaveBadgeTranslationKey =
  | 'collectPage.saveStatus.savingLabel'
  | 'collectPage.saveStatus.savingAriaLabel'
  | 'collectPage.saveStatus.savedLabel'
  | 'collectPage.saveStatus.savedAriaLabel'
  | 'collectPage.saveStatus.errorLabel'
  | 'collectPage.saveStatus.errorAriaLabel'

export type SaveBadgeConfig = {
  severity: ComponentProps<typeof Badge>['severity']
  labelKey: SaveBadgeTranslationKey
  ariaLabelKey: SaveBadgeTranslationKey
}

export function getSaveBadgeLabel(
  saveStatus: SAVE_STATUS,
): SaveBadgeConfig | undefined {
  switch (saveStatus) {
    case SAVE_STATUS.SAVING:
      return {
        severity: undefined,
        labelKey: 'collectPage.saveStatus.savingLabel',
        ariaLabelKey: 'collectPage.saveStatus.savingAriaLabel',
      }
    case SAVE_STATUS.SAVED:
      return {
        severity: 'success',
        labelKey: 'collectPage.saveStatus.savedLabel',
        ariaLabelKey: 'collectPage.saveStatus.savedAriaLabel',
      }
    case SAVE_STATUS.ERROR:
      return {
        severity: 'error',
        labelKey: 'collectPage.saveStatus.errorLabel',
        ariaLabelKey: 'collectPage.saveStatus.errorAriaLabel',
      }
    case SAVE_STATUS.IDLE:
      return undefined
  }
}
