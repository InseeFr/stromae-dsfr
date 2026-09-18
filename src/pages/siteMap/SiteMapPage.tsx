import { memo } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Grid } from '@/components/Grid'
import { createSafeUrl } from '@/utils/url'

import { siteMapRoute } from './route'

export const SiteMapPage = memo(function SiteMapPage() {
  const { t } = useTranslation()
  const { interrogationId } = siteMapRoute.useLoaderData()

  const portalUrl = createSafeUrl(
    import.meta.env.VITE_PORTAIL_URL,
    import.meta.env.VITE_EXIT_PATH,
  )

  return (
    <Grid>
      <Breadcrumb
        currentPageLabel={t('footer.siteMap.title')}
        homeLinkProps={{}}
        segments={[]}
      />
      <div className={fr.cx('fr-container', 'fr-mb-4w')}>
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
          {interrogationId && (
            <>
              <li>
                <Link
                  to="/interrogations/$interrogationId"
                  params={{ interrogationId }}
                >
                  {t('footer.siteMap.questionnaire')}
                </Link>
              </li>
              <li>
                <a
                  className={fr.cx(
                    'fr-link--icon-right',
                    'fr-icon-external-link-line',
                  )}
                  href={portalUrl}
                  target="blank"
                  rel="noopener noreferrer"
                >
                  {t('footer.siteMap.portal')}
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </Grid>
  )
})
