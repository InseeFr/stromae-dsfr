import { type FrCxArg, fr } from '@codegouvfr/react-dsfr'
import { MDLabel } from '@inseefr/lunatic'
import { useTranslation } from 'react-i18next'

import { useSequenceTitle } from '@/hooks/useDocumentTitle'
import type { LunaticOverview } from '@/models/lunaticType'

import { MarkdownLink } from './slotComponents/MarkdownLink'

type SequenceHeaderProps = {
  pagination: 'question' | 'sequence'
  overview: LunaticOverview
  isDirtyState?: boolean
}

export function SequenceHeader(props: SequenceHeaderProps) {
  const { overview, pagination, isDirtyState = false } = props

  const { t } = useTranslation()
  const currentSequenceIndex = overview.findIndex(
    (sequence) => sequence.current,
  )

  if (currentSequenceIndex === -1) {
    console.error('There are no explicit current Sequence')
  }

  const currentSequence = overview.at(currentSequenceIndex) //currentSequence can be undefined when overview equals to []

  useSequenceTitle(currentSequence?.label, isDirtyState)

  if (currentSequenceIndex < 0 || currentSequence === undefined) return null

  if (pagination === 'question')
    return (
      <div className={fr.cx('fr-mt-1w')}>
        <h2 className={fr.cx('fr-stepper__title')}>{currentSequence.label}</h2>
      </div>
    )

  const stepCount = overview.length
  const currentStep = currentSequenceIndex + 1 //overview is sorted and index starts at 0

  return (
    <div
      className={fr.cx('fr-stepper', 'fr-mb-2v', 'sequence-header' as FrCxArg)}
    >
      <h2 className={fr.cx('fr-stepper__title', 'fr-mb-0')}>
        {currentSequence.label}
        <span className={fr.cx('fr-stepper__state')}>
          {t('collectPage.stepperState', { currentStep, stepCount })}
        </span>
      </h2>
      {currentSequence.description && (
        <p>
          <MDLabel
            expression={(currentSequence.description as any).props.expression}
            MarkdownLinkOverride={MarkdownLink}
          />
        </p>
      )}
      <div
        className={fr.cx('fr-stepper__steps')}
        data-fr-current-step={currentStep}
        data-fr-steps={stepCount}
      ></div>
    </div>
  )
}
