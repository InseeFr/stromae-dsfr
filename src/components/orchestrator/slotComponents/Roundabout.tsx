import type { ComponentProps } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import { Badge } from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import type { LunaticSlotComponents } from '@inseefr/lunatic'
import { useStyles } from 'tss-react/dsfr'

import { Declarations } from './Declarations'
import type { ItemOf } from './utils/type'

export const Roundabout: LunaticSlotComponents['Roundabout'] = (props) => {
  const {
    goToIteration,
    items,
    label,
    locked,
    errors: globalErrors,
    description,
    declarations,
  } = props

  const errors = [
    ...(globalErrors ?? []),
    ...items.flatMap((item, index) =>
      (item.errors ?? []).map((error) => ({
        ...error,
        id: `${error.id}-${index}`, //We need to change item error id because we could have 2 errors with same id
      })),
    ),
  ]

  const hasErrors = errors.length > 0

  return (
    <div className={fr.cx('fr-container--fluid')}>
      <h3>{label}</h3>
      {description && <p>{description}</p>}
      <Declarations type="AFTER_QUESTION_TEXT" declarations={declarations} />

      {hasErrors && (
        <div role="alert" className={fr.cx('fr-mb-2v')}>
          {errors.map((error) => {
            if (!error.errorMessage) {
              console.error(`The error : ${error.id} do not contains message`)
              return
            }
            return (
              <Alert
                severity="error"
                description={error.errorMessage}
                small
                className={fr.cx('fr-mt-1w')}
                key={error.id}
                id={error.id}
              />
            )
          })}
        </div>
      )}

      <hr />
      {items.map((item, i) => (
        <RoundaboutItem
          key={i}
          {...item}
          locked={locked}
          onClick={() => goToIteration(i)}
        />
      ))}
    </div>
  )
}

type RoundaboutProps = ComponentProps<LunaticSlotComponents['Roundabout']>
type RoundaboutItemProps = ItemOf<RoundaboutProps['items']> & {
  locked: RoundaboutProps['locked']
  onClick: () => void
}
const RoundaboutItem = (props: RoundaboutItemProps) => {
  const { label, progress, onClick, locked, disabled, description } = props

  const { css } = useStyles()
  return (
    <>
      <div className={fr.cx('fr-grid-row', 'fr-pb-2w', 'fr-grid-row--middle')}>
        <div className={fr.cx('fr-col-12', 'fr-col-md-9')}>
          <h4>{label}</h4>
          {description && <p>{description}</p>}
        </div>

        <div className={fr.cx('fr-col-12', 'fr-col-md-3')}>
          <div
            className={css({
              [fr.breakpoints.up('md')]: {
                justifyContent: 'flex-end',
                display: 'flex',
              },
            })}
          >
            {!disabled &&
              (locked && progress === 1 ? (
                <Badge severity="success">Complété</Badge>
              ) : (
                <Button
                  size="medium"
                  onClick={onClick}
                  priority={progress === 1 ? 'secondary' : 'primary'}
                >
                  {getButtonLabel(progress)}
                </Button>
              ))}
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}

function getButtonLabel(progress: number) {
  if (progress === 1) {
    return 'Modifier'
  }
  if (progress === 0) {
    return 'Reprendre'
  }
  return 'Commencer'
}
