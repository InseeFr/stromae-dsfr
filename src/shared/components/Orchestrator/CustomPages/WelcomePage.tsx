import { fr } from '@codegouvfr/react-dsfr'
import { declareComponentKeys, useTranslation } from 'i18n'
import type { PageType } from 'model/Page'
import type { SurveyUnitMetadata } from 'model/api'
import { useEffect } from 'react'
import type { useStromaeNavigation } from '../useStromaeNavigation'
import { WelcomeModal } from './WelcomeModal'

export function WelcomePage(props: {
  initialCurrentPage: PageType | undefined
  goToPage: ReturnType<typeof useStromaeNavigation>['goToPage']
  metadata?: SurveyUnitMetadata
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
        {/* TODO Improve metadata type */}
        {metadata?.context === 'household' ? (
          <>
            <h2>{t('title who answer')}</h2>
            <ul>
              <li>Alice Doe</li>
              <li>Bernard Doe</li>
              <li>Charlotte Doe</li>
            </ul>
          </>
        ) : null}
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
