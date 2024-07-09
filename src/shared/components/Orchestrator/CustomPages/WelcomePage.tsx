import { fr } from '@codegouvfr/react-dsfr'
import { declareComponentKeys, useTranslation } from 'i18n'
import type { Metadata } from 'model/Metadata'
import type { PageType } from 'model/Page'
import { useEffect } from 'react'
import type { useStromaeNavigation } from '../useStromaeNavigation'
import { WelcomeModal } from './WelcomeModal'

export function WelcomePage(props: {
  initialCurrentPage: PageType | undefined
  goToPage: ReturnType<typeof useStromaeNavigation>['goToPage']
  metadata?: Metadata
}) {
  const { t } = useTranslation({ WelcomePage })
  const { initialCurrentPage, goToPage, metadata } = props

  useEffect(() => {
    // Reset the scroll on component unmount
    return () => {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <>
      <div className={fr.cx('fr-my-4w')}>
        <h1>{t('title')}</h1>
        <p className={fr.cx('fr-text--lead')}>
          {metadata?.objectives ?? t('paragraph')}
        </p>
      </div>
      {initialCurrentPage && (
        <WelcomeModal goBack={() => goToPage({ page: initialCurrentPage })} />
      )}
    </>
  )
}

const { i18n } = declareComponentKeys<
  'title' | 'paragraph' | 'title who answer'
>()({ WelcomePage })

export type I18n = typeof i18n
