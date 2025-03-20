import { type FrCxArg, fr } from '@codegouvfr/react-dsfr'

import { useSequenceTitle } from '@/hooks/useDocumentTitle'
import { declareComponentKeys, useTranslation } from '@/i18n'
import type { LunaticOverview } from '@/models/lunaticType'

type SequenceHeaderProps = {
  pagination: 'question' | 'sequence'
  overview: LunaticOverview
  isDirtyState?: boolean
}

export function SequenceHeader(props: SequenceHeaderProps) {
  const { overview, pagination, isDirtyState = false } = props

  const { t } = useTranslation('SequenceHeader')
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
          {t('stepper state', { currentStep, stepCount })}
        </span>
      </h2>
      {currentSequence.description && <p>{currentSequence.description}</p>}
      <div
        className={fr.cx('fr-stepper__steps')}
        data-fr-current-step={currentStep}
        data-fr-steps={stepCount}
      ></div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<{
  K: 'stepper state'
  P: { currentStep: number; stepCount: number }
  R: string
}>()({ SequenceHeader })

export type I18n = typeof i18n
