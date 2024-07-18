import { fr } from '@codegouvfr/react-dsfr'
import { declareComponentKeys, useTranslation } from 'i18n'
import { useSequenceTitle } from 'shared/hooks/useDocumentTitle'
import type { LunaticOverview } from './utils/lunaticType'

type SequenceHeaderProps = {
  pagination: 'question' | 'sequence'
  overview: LunaticOverview
}

export function SequenceHeader(props: SequenceHeaderProps) {
  const { overview, pagination } = props

  const { t } = useTranslation('SequenceHeader')
  const currentSequenceIndex = overview.findIndex(
    (sequence) => sequence.current
  )

  const currentSequence = overview[currentSequenceIndex]

  useSequenceTitle(currentSequence.label)

  if (currentSequenceIndex < 0) return null

  const stepCount = overview.length
  const currentStep = currentSequenceIndex + 1 //overview is sorted and index starts at 0

  if (pagination === 'question')
    return (
      <div>
        <h2 className={fr.cx('fr-stepper__title')}>{currentSequence.label}</h2>
      </div>
    )

  return (
    <div className={fr.cx('fr-stepper', 'fr-mb-0')}>
      <div className={fr.cx('fr-stepper__title')}>
        <h2>{currentSequence.label}</h2>
        <span className={fr.cx('fr-stepper__state')}>
          {t('stepper state', { currentStep, stepCount })}
        </span>
      </div>
      <p>{currentSequence.description}</p>

      <div
        className={fr.cx('fr-stepper__steps')}
        data-fr-current-step={currentStep}
        data-fr-steps={stepCount}
      ></div>
    </div>
  )
}

const { i18n } = declareComponentKeys<{
  K: 'stepper state'
  P: { currentStep: number; stepCount: number }
  R: string
}>()({ SequenceHeader })

export type I18n = typeof i18n
