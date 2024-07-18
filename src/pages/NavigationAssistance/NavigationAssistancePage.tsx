import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { declareComponentKeys, useTranslation } from 'i18n'
import { memo, type ReactNode } from 'react'
import { Grid } from 'shared/components/Grid'

export const NavigationAssistancePage = memo(
  function NavigationAssistancePage() {
    const { t } = useTranslation({ NavigationAssistancePage })
    return (
      <Grid>
        <Breadcrumb
          currentPageLabel={t('navigation assistance title')}
          homeLinkProps={{
            to: '/',
          }}
          segments={[]}
        />
        <h2>{t('navigation assistance title')}</h2>
        {t('navigation assistance content')}
      </Grid>
    )
  }
)

const { i18n } = declareComponentKeys<
  | 'navigation assistance title'
  | { K: 'navigation assistance content'; R: ReactNode }
>()({ NavigationAssistancePage })

export type I18n = typeof i18n
