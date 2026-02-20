import { memo } from 'react'

import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { useTranslation } from 'react-i18next'

import { Grid } from '@/components/Grid'

export const SecurityPage = memo(function SecurityPage() {
  const { t } = useTranslation()
  const fullUrl = `${window.location.protocol}//${window.location.hostname}`
  return (
    <Grid>
      <Breadcrumb
        currentPageLabel={t('footer.securityPage.title')}
        homeLinkProps={{}}
        segments={[]}
      />
      <h2>{t('footer.securityPage.title')}</h2>
      <p>
        {t('footer.securityPage.contentPrefix')} <a href={fullUrl}>{fullUrl}</a>{' '}
        {t('footer.securityPage.contentSuffix')}
      </p>
    </Grid>
  )
})
