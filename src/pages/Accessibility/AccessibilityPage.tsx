import { declareComponentKeys, useTranslation } from '@/i18n'
import { Grid } from '@/shared/components/Grid'
import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import { memo } from 'react'

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

      {t('declaration content', {
        fullUrl: `${window.location.protocol}//${window.location.hostname}`,
      })}

      <section>
        <h3>{t('conformity status title')}</h3>
        {t('conformity status description')}
        <h4>{t('test results title')}</h4>
        {t('test results content')}
        <h4>{t('non accessible content title')}</h4>
        {t('non accessible content content')}
        <h4>{t('disproportionate burden title')}</h4>
        {t('disproportionate burden content')}
        <h4>{t('non submitted content title')}</h4>
        {t('non submitted content content')}
      </section>

      <section>
        <h3>{t('establishment title')}</h3>
        {t('establishment content')}

        <h4>{t('technologies used title')}</h4>
        {t('technologies used content')}

        <h4>{t('test environment title')}</h4>
        {t('test environment content')}

        <h4>{t('evaluation tools title')}</h4>
        {t('evaluation tools content')}

        <h4>{t('evaluated pages title')}</h4>
        {t('evaluated pages content')}
      </section>

      <section>
        <h3>{t('feedback contact title')}</h3>
        {t('feedback contact content')}
      </section>

      <section>
        <h3>{t('recourse title')}</h3>
        {t('recourse content')}
      </section>
    </Grid>
  )
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  | 'accessibility title'
  | { K: 'declaration content'; R: JSX.Element; P: { fullUrl: string } }
  | 'conformity status title'
  | { K: 'conformity status description'; R: JSX.Element }
  | 'test results title'
  | { K: 'test results content'; R: JSX.Element }
  | 'non accessible content title'
  | { K: 'non accessible content content'; R: JSX.Element }
  | 'disproportionate burden title'
  | { K: 'disproportionate burden content'; R: JSX.Element }
  | 'non submitted content title'
  | { K: 'non submitted content content'; R: JSX.Element }
  | 'establishment title'
  | { K: 'establishment content'; R: JSX.Element }
  | 'technologies used title'
  | { K: 'technologies used content'; R: JSX.Element }
  | 'test environment title'
  | { K: 'test environment content'; R: JSX.Element }
  | 'evaluation tools title'
  | { K: 'evaluation tools content'; R: JSX.Element }
  | 'evaluated pages title'
  | { K: 'evaluated pages content'; R: JSX.Element }
  | 'feedback contact title'
  | { K: 'feedback contact content'; R: JSX.Element }
  | 'recourse title'
  | { K: 'recourse content'; R: JSX.Element }
>()({ AccessibilityPage })

export type I18n = typeof i18n
