import { declareComponentKeys, useTranslation } from '@/i18n'
import { AccessibilityPage } from '@/pages/Accessibility/AccessibilityPage'
import { LegalsPage } from '@/pages/Legals/LegalsPage'
import { NavigationAssistancePage } from '@/pages/NavigationAssistance/NavigationAssistancePage'
import { SecurityPage } from '@/pages/Security/SecurityPage'
import { Grid } from '@/shared/components/Grid'
import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import { Link } from '@tanstack/react-router'
import { memo } from 'react'

export const SiteMapPage = memo(function SiteMapPage() {
  const { t } = useTranslation({
    SiteMapPage,
  })

  const { t: t_LegalsPage } = useTranslation({
    LegalsPage,
  })
  const { t: t_NavigationAssistancePage } = useTranslation({
    NavigationAssistancePage,
  })

  const { t: t_SecurityPage } = useTranslation({
    SecurityPage,
  })
  const { t: t_AccessibilityPage } = useTranslation({ AccessibilityPage })

  return (
    <Grid>
      <Breadcrumb
        currentPageLabel={t('sitemap title')}
        homeLinkProps={{}}
        segments={[]}
      />
      <h2>{t('sitemap title')}</h2>
      <ul>
        <li>
          <Link to="/accessibilite">
            {t_AccessibilityPage('accessibility title')}
          </Link>
        </li>
        <li>
          <Link to="/mentions-legales">{t_LegalsPage('legals title')}</Link>
        </li>

        <li>
          <Link to="/securite">{t_SecurityPage('security title')}</Link>
        </li>
        <li>
          <Link to="/aide-a-la-navigation">
            {t_NavigationAssistancePage('navigation assistance title')}
          </Link>
        </li>
      </ul>
    </Grid>
  )
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<'sitemap title'>()({ SiteMapPage })

export type I18n = typeof i18n
