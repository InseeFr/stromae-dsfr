import { memo } from 'react'

import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'

import accessibilityAuditReport from '@/assets/1-grille-RGAA-v2025-09-09-Questionnaire-enquêtes.pdf'
import { Grid } from '@/components/Grid'
import { declareComponentKeys, useTranslation } from '@/i18n'

export const AccessibilityPage = memo(function AccessibilityPage() {
  const { t } = useTranslation({ AccessibilityPage })

  return (
    <Grid>
      <Breadcrumb
        currentPageLabel={t('accessibility title')}
        homeLinkProps={{}}
        segments={[]}
      />
      <h2>{t('accessibility title')}</h2>
      <h3>{t('declaration title')}</h3>

      {t('declaration content', {
        fullUrl: `${window.location.protocol}//${window.location.hostname}`,
      })}

      <section>
        <h3 className="fr-mt-5w">{t('conformity status title')}</h3>
        {t('conformity status description')}
        <h4 className="fr-mt-4w">{t('test results title')}</h4>
        {t('test results content', { fileUrl: accessibilityAuditReport })}
        <h4 className="fr-mt-4w">{t('non accessible content title')}</h4>
        <h5 className="fr-mt-2w">{t('non compliant content title')}</h5>
        {t('non compliant content content')}
        <h5 className="fr-mt-2w">{t('disproportionate burden title')}</h5>
        {t('disproportionate burden content')}
        <h5 className="fr-mt-2w">{t('non submitted content title')}</h5>
        {t('non submitted content content')}
      </section>

      <section>
        <h3 className="fr-mt-5w">{t('establishment title')}</h3>
        {t('establishment content')}

        <h4 className="fr-mt-4w">{t('technologies used title')}</h4>
        {t('technologies used content')}

        <h4 className="fr-mt-4w">{t('test environment title')}</h4>
        {t('test environment content')}

        <h4 className="fr-mt-4w">{t('evaluation tools title')}</h4>
        {t('evaluation tools content')}

        <h4 className="fr-mt-4w">{t('evaluated pages title')}</h4>
        <h5 className="fr-mt-2w">{t('evaluated structured sample title')}</h5>
        {t('evaluated structured sample content')}

        <h5 className="fr-mt-2w">{t('evaluated random sample title')}</h5>
        {t('evaluated random sample content')}
      </section>

      <section>
        <h3 className="fr-mt-5w">{t('feedback contact title')}</h3>
        {t('feedback contact content')}
      </section>

      <section>
        <h3 className="fr-mt-5w">{t('recourse title')}</h3>
        {t('recourse content')}
      </section>
    </Grid>
  )
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  | 'accessibility title'
  | 'declaration title'
  | { K: 'declaration content'; R: React.JSX.Element; P: { fullUrl: string } }
  | 'conformity status title'
  | { K: 'conformity status description'; R: React.JSX.Element }
  | 'test results title'
  | { K: 'test results content'; R: React.JSX.Element; P: { fileUrl: string } }
  | 'non accessible content title'
  | 'non compliant content title'
  | { K: 'non compliant content content'; R: React.JSX.Element }
  | 'disproportionate burden title'
  | { K: 'disproportionate burden content'; R: React.JSX.Element }
  | 'non submitted content title'
  | { K: 'non submitted content content'; R: React.JSX.Element }
  | 'establishment title'
  | { K: 'establishment content'; R: React.JSX.Element }
  | 'technologies used title'
  | { K: 'technologies used content'; R: React.JSX.Element }
  | 'test environment title'
  | { K: 'test environment content'; R: React.JSX.Element }
  | 'evaluation tools title'
  | { K: 'evaluation tools content'; R: React.JSX.Element }
  | 'evaluated pages title'
  | { K: 'evaluated pages content'; R: React.JSX.Element }
  | 'evaluated structured sample title'
  | { K: 'evaluated structured sample content'; R: React.JSX.Element }
  | 'evaluated random sample title'
  | { K: 'evaluated random sample content'; R: React.JSX.Element }
  | 'feedback contact title'
  | { K: 'feedback contact content'; R: React.JSX.Element }
  | 'recourse title'
  | { K: 'recourse content'; R: React.JSX.Element }
>()({ AccessibilityPage })

export type I18n = typeof i18n
