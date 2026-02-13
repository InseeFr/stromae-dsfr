import { fr } from '@codegouvfr/react-dsfr'
import { useTranslation } from 'react-i18next'

import { useDocumentTitle } from '@/hooks/useDocumentTitle'

/**
 * Page displayed when the user finishes the survey before they submit their
 * answers
 */
export function ValidationPage() {
  const { t } = useTranslation()

  useDocumentTitle(t('validation.title'))

  return (
    <div className={fr.cx('fr-my-4w')}>
      <h1>{t('validation.title')}</h1>
      <p>{t('validation.paragraph')}</p>
    </div>
  )
}
