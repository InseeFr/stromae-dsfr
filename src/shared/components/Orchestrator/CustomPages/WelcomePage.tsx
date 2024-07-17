import { fr } from '@codegouvfr/react-dsfr'
import { declareComponentKeys, useTranslation } from 'i18n'
import type { Metadata } from 'model/Metadata'
import { useEffect } from 'react'
import { useDocumentTitle } from 'shared/hooks/useDocumentTitle'
import { useWhyRender } from 'utils/useWhyRender'

export function WelcomePage(props: { metadata?: Metadata }) {
  useWhyRender(props, 'WelcomePage')

  const { t } = useTranslation({ WelcomePage })
  const { metadata } = props

  useEffect(() => {
    // Reset the scroll on component unmount
    return () => {
      window.scrollTo(0, 0)
    }
  }, [])

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

const { i18n } = declareComponentKeys<
  'title' | 'paragraph' | 'document title'
>()({ WelcomePage })

export type I18n = typeof i18n
