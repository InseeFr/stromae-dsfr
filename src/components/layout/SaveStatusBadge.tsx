import { type FrCxArg, fr } from '@codegouvfr/react-dsfr'
import Badge from '@codegouvfr/react-dsfr/Badge'
import { useTranslation } from 'react-i18next'

import { SAVE_STATUS } from '@/constants/saveStatus'

import { getSaveBadgeLabel } from '../orchestrator/utils/saveStatus'

type SaveStatusBadgeProps = {
  saveStatus: SAVE_STATUS
}

/** Displays the save help text and the badge reflecting the saving state. */
export function SaveStatusBadge({
  saveStatus,
}: Readonly<SaveStatusBadgeProps>) {
  const { t } = useTranslation()
  const saveBadgeConfig = getSaveBadgeLabel(saveStatus)

  return (
    <div className="save-status">
      <p
        className={fr.cx(
          'fr-text-mention--grey' as FrCxArg,
          'fr-text--xs',
          'fr-mb-0',
        )}
      >
        {t('collectPage.saveStatus.helpText')}
      </p>
      {saveBadgeConfig && (
        // output is used here instead of div to better handle text changes with screen-readers
        <output className={fr.cx('fr-mt-1w')}>
          <Badge
            as="span"
            small
            severity={saveBadgeConfig.severity}
            aria-label={t(saveBadgeConfig.ariaLabelKey)}
          >
            {t(saveBadgeConfig.labelKey)}
          </Badge>
        </output>
      )}
    </div>
  )
}
