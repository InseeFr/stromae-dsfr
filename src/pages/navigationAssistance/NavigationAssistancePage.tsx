import { memo } from 'react'

import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { useTranslation } from 'react-i18next'

import { Grid } from '@/components/Grid'

export const NavigationAssistancePage = memo(
  function NavigationAssistancePage() {
    const { t } = useTranslation()
    return (
      <Grid>
        <Breadcrumb
          currentPageLabel={t('footer.navigationAssistance.title')}
          homeLinkProps={{
            to: '/',
          }}
          segments={[]}
        />
        <div>
          <h2>{t('footer.navigationAssistance.title')}</h2>
          <p>{t('footer.navigationAssistance.content1')}</p>
          <p>{t('footer.navigationAssistance.content2')}</p>
          <p>{t('footer.navigationAssistance.content3')}</p>
        </div>
      </Grid>
    )
  },
)
