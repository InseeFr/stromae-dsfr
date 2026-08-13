import { memo } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { useGetQuestionnaireData } from '@/api/03-questionnaires.ts'
import { Grid } from '@/components/Grid'
import type { SequenceItem } from '@/models/questionnaireStructure'
import {
  extractSequences,
  isQuestionnaireWithComponents,
} from '@/utils/siteMap'

import { siteMapRoute } from './route'

export const SiteMapPage = memo(function SiteMapPage() {
  const { t } = useTranslation()
  const { questionnaireId } = siteMapRoute.useLoaderData()

  const { data: questionnaireData } = useGetQuestionnaireData(
    questionnaireId ?? '',
    {
      query: { enabled: !!questionnaireId },
    },
  )

  // @ts-expect-error orval API type is incomplete
  const questionnaireLabel = questionnaireData?.label?.value ?? ''

  const sequences: SequenceItem[] = []
  if (
    questionnaireData &&
    isQuestionnaireWithComponents(questionnaireData) &&
    questionnaireData.components
  ) {
    sequences.push(...extractSequences(questionnaireData.components))
  }

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
        </ul>
      </div>

      {questionnaireData && (
        <div className={fr.cx('fr-container', 'fr-mb-4w')}>
          <h2>{questionnaireLabel}</h2>
          <h3 className={fr.cx('fr-stepper__title', 'fr-mb-0')}>
            {t('footer.siteMap.questionnaireLabel')}
          </h3>
          <i>{t('footer.siteMap.questionnaireNotLink')}</i>
          <ul>
            {sequences.map((item) => (
              <li key={item.id}>
                {item.label}
                {item.subSequences.length > 0 && (
                  <ul>
                    {item.subSequences.map((sub) => (
                      <li key={sub.id}>{sub.label}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Grid>
  )
})
