import { fr } from '@codegouvfr/react-dsfr'

import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { declareComponentKeys, useTranslation } from '@/i18n'
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
  const { t } = useTranslation({ EndPage })

  const formattedDate = date ? new Date(date).toLocaleString() : undefined
  const isDateStillValid = state !== 'TOEXTRACT' && state !== 'EXTRACTED'

  useDocumentTitle(t('document title'))

  return (
    <div className={fr.cx('fr-my-4w')}>
      <h1>{t('title')}</h1>
      <p>
        {t('paragraph', {
          formattedDate: isDateStillValid ? formattedDate : undefined,
        })}
      </p>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  | 'title'
  | {
      K: 'paragraph'
      P: { formattedDate?: string }
      R: string
    }
  | 'document title'
>()({ EndPage })

export type I18n = typeof i18n
