import { type ReactNode, memo } from 'react'

import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'

import { Grid } from '@/components/Grid'
import { declareComponentKeys, useTranslation } from '@/i18n'

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
  },
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  | 'navigation assistance title'
  | { K: 'navigation assistance content'; R: ReactNode }
>()({ NavigationAssistancePage })

export type I18n = typeof i18n
