import { declareComponentKeys, useTranslation } from '@/i18n'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import { fr } from '@codegouvfr/react-dsfr'

export function EndPage(props: { date: number | undefined }) {
  const { date = Date.now() } = props
  const { t } = useTranslation({ EndPage })
  const formatedDate = new Date(date).toLocaleString()

  useDocumentTitle(t('document title'))

  return (
    <div className={fr.cx('fr-my-4w')}>
      <h1>{t('title')}</h1>
      <p>{t('paragraph', { formatedDate })}</p>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  | 'title'
  | {
      K: 'paragraph'
      P: { formatedDate: string }
      R: string
    }
  | 'document title'
>()({ EndPage })

export type I18n = typeof i18n
