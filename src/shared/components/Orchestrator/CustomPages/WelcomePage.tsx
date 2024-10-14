import {
  declareComponentKeys,
  useResolveLocalizedString,
  useTranslation,
} from '@/i18n'
import type { Contents, Metadata } from '@/model/Metadata'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import { fr } from '@codegouvfr/react-dsfr'
import { Fragment } from 'react'

function renderMetadataContents(contents: Contents[] | undefined) {
  if (contents === undefined) return null
  return (
    <>
      {contents.map((content, contentIndex) => (
        <section key={contentIndex}>
          {content.title && <h2>{content.title}</h2>}
          {content.contentBlocks.map((block, blockIndex) => (
            <Fragment key={blockIndex}>
              {(() => {
                switch (block.type) {
                  case 'list':
                    return (
                      <ul className={fr.cx('fr-mb-6v')}>
                        {block.textItems.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    )
                  case 'paragraph':
                  default:
                    return block.textItems.map((text, textIndex) => (
                      <p key={textIndex}>{text}</p>
                    ))
                }
              })()}
            </Fragment>
          ))}
        </section>
      ))}
    </>
  )
}

export function WelcomePage(props: { metadata: Metadata }) {
  const { t } = useTranslation({ WelcomePage })
  const { metadata } = props
  const { resolveLocalizedString } = useResolveLocalizedString({
    labelWhenMismatchingLanguage: true,
  })

  useDocumentTitle(t('document title'))

  return (
    <>
      <div className={fr.cx('fr-my-4w')}>
        <h1>{t('title')}</h1>
        <p className={fr.cx('fr-text--lead')}>
          {resolveLocalizedString(metadata.objectives)}
        </p>
        {renderMetadataContents(metadata.campaignInfo)}
        {renderMetadataContents(metadata.surveyUnitInfo)}
      </div>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  'title' | 'paragraph' | 'document title'
>()({ WelcomePage })

export type I18n = typeof i18n
