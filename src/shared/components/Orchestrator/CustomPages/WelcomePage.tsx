import { fr } from '@codegouvfr/react-dsfr'
import { declareComponentKeys, useTranslation } from 'i18n'
import type { Metadata } from 'model/Metadata'
import { useDocumentTitle } from 'shared/hooks/useDocumentTitle'

export function WelcomePage(props: { metadata?: Metadata }) {
  const { t } = useTranslation({ WelcomePage })
  const { metadata } = props

  console.log(metadata)
  useDocumentTitle(t('document title'))

  return (
    <>
      <div className={fr.cx('fr-my-4w')}>
        <h1>{t('title')}</h1>
        <p className={fr.cx('fr-text--lead')}>
          {metadata?.objectives ?? t('paragraph')}
        </p>
      </div>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  'title' | 'paragraph' | 'document title'
>()({ WelcomePage })

export type I18n = typeof i18n
