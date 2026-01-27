import { fr } from '@codegouvfr/react-dsfr'

import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useTranslation } from 'react-i18next'
import type { StateData } from '@/models/stateData'

/**
 * Display time at which user has sent its answers.
 * If the data have been extracted, the date will have been changed by the
 * extractor so we stop displaying the date.
 */
export function EndPage({
  date,
  state,
}: Readonly<{
  date?: number
  state?: StateData['state']
}>) {
  const { t } = useTranslation()
  const formattedDate = date ? new Date(date).toLocaleString() : undefined
  const isDateStillValid = state !== 'TOEXTRACT' && state !== 'EXTRACTED'

  useDocumentTitle(t('endPage.title'))

  return (
    <div className={fr.cx('fr-my-4w')}>
      <h1>{t('endPage.title')}</h1>
      <p>
        {t('endPage.paragraph', {
          formattedDate: isDateStillValid ? formattedDate : undefined,
        })}
      </p>
    </div>
  )
}
