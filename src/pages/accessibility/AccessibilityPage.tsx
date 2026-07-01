import { memo } from 'react'

import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import { useTranslation } from 'react-i18next'

import { Grid } from '@/components/Grid'

export const AccessibilityPage = memo(function AccessibilityPage() {
  const { t } = useTranslation()
  const fullUrl = `${window.location.protocol}//${window.location.hostname}`

  // Helper function to safely get array from translation
  const getArray = (key: string): any[] => {
    const result = t(key, { returnObjects: true } as any)
    return Array.isArray(result) ? result : []
  }

  return (
    <Grid>
      <Breadcrumb
        currentPageLabel={t('accessibility.title')}
        homeLinkProps={{}}
        segments={[]}
      />
      <h2>{t('accessibility.title')}</h2>
      <h3>{t('accessibility.declarationTitle')}</h3>

      <p>{t('accessibility.declaration.paragraph1')}</p>
      <p>
        {t('accessibility.declaration.paragraph2Prefix')}{' '}
        <a
          className="fr-link"
          href={t('accessibility.declaration.paragraph2LinkUrl')}
          target="_blank"
          title={t('accessibility.declaration.paragraph2LinkTitle')}
        >
          {t('accessibility.declaration.paragraph2LinkText')}
        </a>
      </p>
      <p>
        {t('accessibility.declaration.paragraph3Prefix')}{' '}
        <a className="fr-link" href={fullUrl}>
          {fullUrl}
        </a>
        {t('accessibility.declaration.paragraph3Suffix')}
      </p>

      <section>
        <h3 className="fr-mt-5w">
          {t('accessibility.conformityStatus.title')}
        </h3>
        <p>
          {t('accessibility.conformityStatus.prefix')}{' '}
          <a
            className="fr-link"
            href={t('accessibility.conformityStatus.linkUrl')}
            target="_blank"
            title={t('accessibility.conformityStatus.linkTitle')}
          >
            {t('accessibility.conformityStatus.linkText')}
          </a>{' '}
          {t('accessibility.conformityStatus.middle')}{' '}
          <a
            className="fr-link"
            href={t('accessibility.conformityStatus.rgaaLinkUrl')}
            target="_blank"
            title={t('accessibility.conformityStatus.rgaaLinkTitle')}
          >
            {t('accessibility.conformityStatus.rgaaLinkText')}
          </a>
          {t('accessibility.conformityStatus.suffix')}
        </p>

        <h4 className="fr-mt-4w">{t('accessibility.testResults.title')}</h4>
        <p>
          {t('accessibility.testResults.introPrefix')}{' '}
          <a
            className="fr-link"
            href={t('accessibility.testResults.auditorLinkUrl')}
            target="_blank"
            title={t('accessibility.testResults.auditorLinkTitle')}
          >
            {t('accessibility.testResults.auditorLinkText')}
          </a>{' '}
          {t('accessibility.testResults.introSuffix')}
        </p>
        <ul>
          <li>{t('accessibility.testResults.criterion1')}</li>
          <li>
            <a
              className="fr-link"
              href={t('accessibility.testResults.auditGridLinkUrl')}
              target="_blank"
              title={t('accessibility.testResults.auditGridLinkTitle')}
            >
              {t('accessibility.testResults.auditGridLinkText')}
            </a>
          </li>
        </ul>

        <h4 className="fr-mt-4w">
          {t('accessibility.nonAccessibleContent.title')}
        </h4>
        <h5 className="fr-mt-2w">
          {t('accessibility.nonAccessibleContent.nonCompliantTitle')}
        </h5>
        <p>{t('accessibility.nonAccessibleContent.nonCompliantIntro')}</p>
        <ul>
          {getArray('accessibility.nonAccessibleContent.criteria').map(
            (criterion: string, index: number) => (
              <li key={index}>{criterion}</li>
            ),
          )}
        </ul>
      </section>

      <section>
        <h3 className="fr-mt-5w">{t('accessibility.establishment.title')}</h3>
        <p>{t('accessibility.establishment.content')}</p>

        <h4 className="fr-mt-4w">
          {t('accessibility.technologiesUsed.title')}
        </h4>
        <p>{t('accessibility.technologiesUsed.intro')}</p>
        <ul>
          {getArray('accessibility.technologiesUsed.list').map(
            (tech: string, index: number) => (
              <li key={index}>{tech}</li>
            ),
          )}
        </ul>

        <h4 className="fr-mt-4w">{t('accessibility.testEnvironment.title')}</h4>
        <p>{t('accessibility.testEnvironment.intro')}</p>
        <ul>
          {getArray('accessibility.testEnvironment.items').map(
            (item: string, index: number) => (
              <li key={index}>{item}</li>
            ),
          )}
        </ul>

        <h4 className="fr-mt-4w">{t('accessibility.evaluationTools.title')}</h4>
        <p>{t('accessibility.evaluationTools.intro')}</p>
        <ul>
          {getArray('accessibility.evaluationTools.tools').map(
            (
              tool:
                | string
                | {
                    text: string
                    linkText: string
                    linkUrl: string
                    linkTitle: string
                  },
              index: number,
            ) => (
              <li key={index}>
                {typeof tool === 'string' ? (
                  tool
                ) : (
                  <>
                    {tool.text}{' '}
                    <a
                      className="fr-link"
                      href={tool.linkUrl}
                      target="_blank"
                      title={tool.linkTitle}
                    >
                      {tool.linkText}
                    </a>
                  </>
                )}
              </li>
            ),
          )}
        </ul>

        <h4 className="fr-mt-4w">{t('accessibility.evaluatedPages.title')}</h4>
        <h5 className="fr-mt-2w">
          {t('accessibility.evaluatedPages.structuredSampleTitle')}
        </h5>
        <ul>
          {getArray('accessibility.evaluatedPages.structuredSamplePages').map(
            (page: string, index: number) => (
              <li key={index}>{page}</li>
            ),
          )}
        </ul>
      </section>

      <section>
        <h3 className="fr-mt-5w">{t('accessibility.feedbackContact.title')}</h3>
        <p>
          {t('accessibility.feedbackContact.contentPrefix')}{' '}
          <a
            className="fr-link"
            href={t('accessibility.feedbackContact.linkUrl')}
            target="_blank"
            title={t('accessibility.feedbackContact.linkTitle')}
          >
            {t('accessibility.feedbackContact.linkText')}
          </a>
        </p>
      </section>

      <section>
        <h3 className="fr-mt-5w">{t('accessibility.recourse.title')}</h3>
        <p>{t('accessibility.recourse.intro')}</p>
        <ul>
          {getArray('accessibility.recourse.links').map(
            (link: { text: string; url: string }, index: number) => (
              <li key={index}>
                <a
                  className="fr-link"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.text}
                </a>
              </li>
            ),
          )}
          <li>
            {t('accessibility.recourse.mailPrefix')}
            {getArray('accessibility.recourse.mailAddress').map(
              (line: string, index: number) => (
                <div key={index}>{line}</div>
              ),
            )}
          </li>
          <li>{t('accessibility.recourse.phone')}</li>
        </ul>
      </section>
    </Grid>
  )
})
