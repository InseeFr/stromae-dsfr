import { memo } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import { type LunaticSource, useLunatic } from '@inseefr/lunatic'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { useGetQuestionnaireData } from '@/api/03-questionnaires.ts'
import { Grid } from '@/components/Grid'
import type { SequenceItem } from '@/models/questionnaireStructure'
import { extractSequencesFromOverview } from '@/utils/siteMap'

import { siteMapRoute } from './route'

// Handle visualize source page (the questionnaire steps are hidden from the page)
const EMPTY_SOURCE: LunaticSource = { components: [], variables: [] }

export const SiteMapPage = memo(function SiteMapPage() {
  const { t } = useTranslation()
  const { questionnaireId, source } = siteMapRoute.useLoaderData()

  const { data: questionnaireData } = useGetQuestionnaireData(
    questionnaireId ?? '',
    {
      query: { enabled: !!questionnaireId },
    },
  )

  const { overview } = useLunatic(source ?? EMPTY_SOURCE, questionnaireData, {
    withOverview: true,
  })

  const sequences: SequenceItem[] = extractSequencesFromOverview(overview)

  // @ts-expect-error orval API type is incomplete
  const questionnaireLabel = questionnaireData?.label?.value ?? ''

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

      {questionnaireData && source && (
        <div className={fr.cx('fr-container', 'fr-mb-4w')}>
          <h2>{questionnaireLabel}</h2>
          <h3 className={fr.cx('fr-stepper__title', 'fr-mb-1w')}>
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
