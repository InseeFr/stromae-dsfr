import { memo } from 'react'

import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import { useTranslation } from 'react-i18next'

import { Grid } from '@/components/Grid'

export const LegalsPage = memo(function LegalsPage() {
  const { t } = useTranslation()
  return (
    <Grid>
      <Breadcrumb
        currentPageLabel={t('legal.legalsTitle')}
        homeLinkProps={{}}
        segments={[]}
      />
      <h2>{t('legal.legalsTitle')}</h2>
      <section>
        <h3>{t('legal.serviceTitle')}</h3>
        <p>
          {t('legal.serviceContent1')}
          <br />
          {t('legal.serviceContent2')}
          <br />
          {t('legal.serviceContent3')}
        </p>

        <h3>{t('legal.surveyLegalsTermsTitle')}</h3>
        <p>{t('legal.surveyLegalsTermsContent')}</p>

        <h3>{t('legal.cookiesTitle')}</h3>
        <p>{t('legal.cookiesContent')}</p>

        <h3>{t('legal.sessionTitle')}</h3>
        <p>
          {t('legal.sessionContent')}
          <br />
          {t('legal.sessionContentDetails')}
        </p>

        <h3>{t('legal.copyrightTitle')}</h3>
        <p>{t('legal.copyrightContent')}</p>

        <h3>{t('legal.editorInformationTitle')}</h3>
        <p>
          {t('legal.editorInformationLine1')}
          <br />
          <br />
          {t('legal.editorInformationLine2')}
          <br />
          <br />
          {t('legal.editorInformationLine3')}
          <br />
          <br />
          {t('legal.editorInformationLine4')}
        </p>

        <h3>{t('legal.personalDataTitle')}</h3>
        <a href={t('legal.personalDataLink')}>
          {t('legal.personalDataContent')}
        </a>
      </section>
    </Grid>
  )
})
