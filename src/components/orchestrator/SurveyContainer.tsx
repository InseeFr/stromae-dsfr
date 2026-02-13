import { type PropsWithChildren, type ReactNode, useState } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import { useTranslation } from 'react-i18next'

import { MODE_TYPE } from '@/constants/mode'
import { PAGE_TYPE } from '@/constants/page'
import type { LunaticOverview } from '@/models/lunaticType'
import type { InternalPageType } from '@/models/page'

import type { OrchestratorProps } from './Orchestrator'
import { SequenceHeader } from './SequenceHeader'

/** Displays form, allows to go next and back */
export function SurveyContainer(
  props: PropsWithChildren<{
    currentPage: InternalPageType
    handlePreviousClick: () => void
    handleNextClick: () => void
    handleDownloadData: () => void
    handleDownloadArticulation: () => void
    handleDepositProofClick: () => Promise<void>
    mode: OrchestratorProps['mode']
    pagination: 'question' | 'sequence'
    overview: LunaticOverview
    hasArticulation: boolean
    isDownloadEnabled: boolean
    isDirtyState?: boolean
    isSequencePage: boolean
    bottomContent: ReactNode
  }>,
) {
  const {
    currentPage,
    handleNextClick,
    handlePreviousClick,
    handleDownloadData,
    handleDownloadArticulation,
    handleDepositProofClick,
    children,
    mode,
    pagination,
    overview,
    hasArticulation,
    isDownloadEnabled,
    isDirtyState = false,
    isSequencePage,
    bottomContent,
  } = props

  const { t } = useTranslation()

  const isPreviousButtonDisplayed = [PAGE_TYPE.WELCOME, PAGE_TYPE.END].includes(
    currentPage,
  )

  const [isLayoutExpanded, setIsLayoutExpanded] = useState<boolean>(
    pagination === 'sequence',
  )

  const displaySequenceHeader =
    !isSequencePage && currentPage === PAGE_TYPE.LUNATIC

  return (
    <>
      {!isPreviousButtonDisplayed && (
        <div className={fr.cx('fr-container')}>
          {displaySequenceHeader && (
            <SequenceHeader
              overview={overview}
              pagination={pagination}
              isDirtyState={isDirtyState}
            />
          )}
          <div className={fr.cx('fr-grid-row', 'fr-grid-row--center')}>
            <div className={fr.cx('fr-col', 'fr-grid-row--left')}>
              <Button
                id="button-precedent"
                title={t('collectPage.previousTitle')}
                priority="tertiary no outline"
                iconId="fr-icon-arrow-left-line"
                onClick={handlePreviousClick}
                disabled={isPreviousButtonDisplayed}
              >
                {t('collectPage.previousLabel')}
              </Button>
            </div>

            {pagination === 'sequence' && currentPage === PAGE_TYPE.LUNATIC && (
              <div
                className={fr.cx(
                  'fr-col',
                  ...(isLayoutExpanded
                    ? (['fr-grid-row--right'] as const)
                    : (['fr-grid-row--left'] as const)),
                  'fr-hidden',
                  'fr-unhidden-md',
                  'fr-col-offset-8',
                  'fr-col-offset-md-9',
                )}
              >
                <Button
                  iconId={
                    isLayoutExpanded
                      ? 'ri-collapse-diagonal-line'
                      : 'ri-expand-diagonal-line'
                  }
                  priority="tertiary"
                  onClick={() => setIsLayoutExpanded((expanded) => !expanded)}
                  title={
                    isLayoutExpanded
                      ? t('collectPage.collapse')
                      : t('collectPage.expand')
                  }
                  aria-pressed={isLayoutExpanded}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className={fr.cx('fr-container')}>
        <div className={fr.cx('fr-grid-row', 'fr-grid-row--center')}>
          <div
            className={fr.cx(
              'fr-col-12',
              'fr-mb-10v',
              ...(!(isLayoutExpanded && currentPage === PAGE_TYPE.LUNATIC)
                ? (['fr-col-md-9', 'fr-col-lg-8'] as const)
                : []),
            )}
          >
            {children}
            <Button
              priority="primary"
              title={
                currentPage === PAGE_TYPE.END
                  ? t('collectPage.continueTitleEnd')
                  : t('collectPage.continueTitleDefault')
              }
              id="continue-button"
              onClick={
                currentPage === PAGE_TYPE.END
                  ? handleDepositProofClick
                  : handleNextClick
              }
            >
              {t(
                currentPage === PAGE_TYPE.END
                  ? 'collectPage.continueEnd'
                  : currentPage === PAGE_TYPE.WELCOME
                    ? 'collectPage.continueWelcome'
                    : 'collectPage.continueLunatic',
              )}
            </Button>
            {bottomContent}
            {(mode === MODE_TYPE.VISUALIZE || isDownloadEnabled) && (
              <div style={{ justifyContent: 'flex-end', textAlign: 'right' }}>
                <Button
                  iconId="ri-download-2-line"
                  priority="tertiary no outline"
                  onClick={handleDownloadData}
                  title={t('collectPage.downloadData')}
                >
                  {t('collectPage.downloadData')}
                </Button>
                {hasArticulation && (
                  <Button
                    iconId="ri-download-2-line"
                    priority="tertiary no outline"
                    onClick={handleDownloadArticulation}
                    title={t('collectPage.downloadArticulation')}
                  >
                    {t('collectPage.downloadArticulation')}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
