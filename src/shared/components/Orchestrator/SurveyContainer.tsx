import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import { declareComponentKeys, useTranslation } from 'i18n'
import type { InternalPageType } from 'model/Page'
import { useState, type PropsWithChildren, type ReactNode } from 'react'
import type { OrchestratorProps } from './Orchestrator'
import { SequenceHeader } from './SequenceHeader'
import type { LunaticOverview } from './utils/lunaticType'

export function SurveyContainer(
  props: PropsWithChildren<{
    currentPage: InternalPageType
    handlePreviousClick: () => void
    handleNextClick: () => void
    handleDownloadData: () => void
    handleDepositProofClick: () => Promise<void>
    mode: OrchestratorProps['mode']
    pagination: 'question' | 'sequence'
    overview: LunaticOverview
    isSequencePage: boolean
    bottomContent: ReactNode
  }>
) {
  const {
    currentPage,
    handleNextClick,
    handlePreviousClick,
    handleDownloadData,
    handleDepositProofClick,
    children,
    pagination,
    overview,
    isSequencePage,
    bottomContent,
  } = props

  const { t } = useTranslation({ SurveyContainer })

  const isPreviousButtonDisplayed = ['welcomePage', 'endPage'].includes(
    currentPage
  )

  const [isLayoutExpanded, setIsLayoutExpanded] = useState<boolean>(false)

  const displaySequenceHeader = !isSequencePage && currentPage === 'lunaticPage'

  return (
    <>
      {!isPreviousButtonDisplayed && (
        <>
          <div className={fr.cx('fr-container')}>
            {displaySequenceHeader && (
              <SequenceHeader overview={overview} pagination={pagination} />
            )}
            <div className={fr.cx('fr-grid-row', 'fr-grid-row--center')}>
              <div className={fr.cx('fr-col', 'fr-grid-row--left')}>
                <Button
                  id="button-precedent"
                  title={t('button previous title')}
                  priority="tertiary no outline"
                  iconId="fr-icon-arrow-left-line"
                  onClick={handlePreviousClick}
                  disabled={isPreviousButtonDisplayed}
                >
                  {t('button previous label')}
                </Button>
              </div>

              {pagination === 'sequence' && currentPage === 'lunaticPage' && (
                <>
                  <div
                    className={fr.cx(
                      'fr-col',
                      ...(isLayoutExpanded
                        ? (['fr-grid-row--right'] as const)
                        : (['fr-grid-row--left'] as const)),
                      'fr-hidden',
                      'fr-unhidden-md',
                      'fr-col-offset-8',
                      'fr-col-offset-md-9'
                    )}
                  >
                    <Button
                      iconId={
                        isLayoutExpanded
                          ? 'ri-collapse-diagonal-line'
                          : 'ri-expand-diagonal-line'
                      }
                      priority="tertiary"
                      onClick={() =>
                        setIsLayoutExpanded((expanded) => !expanded)
                      }
                      title={t('button expand')}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}

      <div className={fr.cx('fr-container')}>
        <div className={fr.cx('fr-grid-row', 'fr-grid-row--center')}>
          <div
            className={fr.cx(
              'fr-col-12',
              'fr-mb-10v',
              ...(!(isLayoutExpanded && currentPage === 'lunaticPage')
                ? (['fr-col-md-9', 'fr-col-lg-8'] as const)
                : [])
            )}
          >
            {children}
            <Button
              priority="primary"
              title={t('button continue title', { currentPage })}
              id="continue-button"
              onClick={
                currentPage === 'endPage'
                  ? handleDepositProofClick
                  : handleNextClick
              }
            >
              {t('button continue label', { currentPage })}
            </Button>
            {bottomContent}
            {true && (
              <div style={{ justifyContent: 'flex-end', textAlign: 'right' }}>
                <Button
                  iconId="ri-download-2-line"
                  priority="tertiary no outline"
                  onClick={handleDownloadData}
                  title={t('button download')}
                >
                  {t('button download')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const { i18n } = declareComponentKeys<
  | 'button previous title'
  | 'button previous label'
  | 'button expand'
  | {
      K: 'button continue title'
      P: { currentPage: InternalPageType }
      R: string
    }
  | {
      K: 'button continue label'
      P: { currentPage: InternalPageType }
      R: string
    }
  | 'button download'
>()({ SurveyContainer })

export type I18n = typeof i18n
