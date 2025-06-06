import { useId, useState } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import type { LunaticSlotComponents } from '@inseefr/lunatic'
import { type NumberFormatValues } from 'react-number-format'

import { useQuestionId } from '../Question'
import { FiledsetError } from '../shared/FieldsetError'
import { getErrorStates } from '../utils/errorStates'
import { DateElement } from './DateElement'
import { TimeElement } from './TimeElement'
import type { DurationKey, DurationValues, DurationValuesFormat } from './type'
import { buildValueFromDuration, extractDurationFromValue } from './utils'

export const Duration: LunaticSlotComponents['Duration'] = (props) => {
  const {
    errors,
    value,
    label,
    format,
    onChange,
    declarations,
    description,
    disabled,
    readOnly,
    iteration,
  } = props

  const id = useId()
  const questionId = useQuestionId()

  const { state, stateRelatedMessage } = getErrorStates(errors)

  if (declarations) {
    //TODO throw and handle globaly errors in an alert with a condition to avoid to display alert in prod
    console.error('Only declaration in Question are displayed')
  }

  const [durationValues, setDurationValues] = useState<DurationValues>(() =>
    extractDurationFromValue(value, format),
  )

  const onDurationChange = (durationValues: DurationValues) => {
    onChange(buildValueFromDuration(durationValues))
  }

  const updateDuration = <T extends DurationValuesFormat>(
    key: DurationKey<T>,
    value: string,
  ) => {
    const newDuration = {
      ...durationValues,
      [key]: value,
    }

    setDurationValues(newDuration)
    onDurationChange(newDuration)
  }

  const onValueChange = <T extends DurationValuesFormat>(
    values: NumberFormatValues,
    key: DurationKey<T>,
  ) => {
    updateDuration<T>(key, values.value)
  }

  const hasLegend = Boolean(label || description)

  return (
    <fieldset
      className={fr.cx(
        'fr-fieldset',
        (() => {
          switch (state) {
            case 'default':
              return undefined
            case 'error':
              return 'fr-fieldset--error'
            case 'success':
              return 'fr-fieldset--valid'
          }
        })(),
      )}
      id={`${id}-fieldset`}
      aria-labelledby={label ? undefined : questionId}
    >
      {hasLegend && (
        <legend className={fr.cx('fr-fieldset__legend')}>
          {label}
          {description && (
            <span className={fr.cx('fr-hint-text')}>{description}</span>
          )}
        </legend>
      )}

      {(() => {
        switch (durationValues.format) {
          case 'PnYnM':
            return (
              <DateElement
                disabled={disabled}
                durationValues={durationValues}
                id={`${id}-${iteration ?? ''}`}
                readOnly={readOnly}
                onValueChange={onValueChange<'PnYnM'>}
              />
            )
          case 'PTnHnM':
            return (
              <TimeElement
                disabled={disabled}
                durationValues={durationValues}
                id={`${id}-${iteration ?? ''}`}
                readOnly={readOnly}
                onValueChange={onValueChange<'PTnHnM'>}
              />
            )
        }
      })()}

      <FiledsetError
        state={state}
        stateRelatedMessage={stateRelatedMessage}
        id={id}
      />
    </fieldset>
  )
}
