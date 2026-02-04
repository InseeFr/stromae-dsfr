import { memo } from 'react'

import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Grid } from '@/components/Grid'

export const SiteMapPage = memo(function SiteMapPage() {
  const { t } = useTranslation()

  return (
    <Grid>
      <Breadcrumb
        currentPageLabel={t('footer.siteMap.title')}
        homeLinkProps={{}}
        segments={[]}
      />
      <h2>{t('footer.siteMap.title')}</h2>
      <ul>
        <li>
          <Link to="/accessibilite">{t('accessibility.title')}</Link>
        </li>
        <li>
          <Link to="/mentions-legales">{t('legal.legalsTitle')}</Link>
        </li>

        <li>
          <Link to="/securite">{t('footer.securityPage.title')}</Link>
        </li>
        <li>
          <Link to="/aide-a-la-navigation">
            {t('footer.navigationAssistance.title')}
          </Link>
        </li>
      </ul>
    </Grid>
  )
})
