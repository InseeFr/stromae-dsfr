import { useRef } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup'
import type { LunaticSlotComponents } from '@inseefr/lunatic'

import { focusLastInput } from '../utils/focusLastRowInput'

export const Loop: LunaticSlotComponents['Loop'] = (props) => {
  const {
    declarations,
    description,
    id,
    label,
    canControlRows,
    children,
    errors,
    addRow,
    removeRow,
  } = props
  const childrenRef = useRef<HTMLDivElement>(null)

  const handleAddRow = () => {
    addRow?.()
    setTimeout(() => {
      if (childrenRef.current) {
        // Needed to bypass the focuskey being overwritten by react-dsfr
        focusLastInput(childrenRef.current)
      }
    }, 0)
  }

  const handleRemoveRow = () => {
    removeRow?.()
    setTimeout(() => {
      if (childrenRef.current) {
        focusLastInput(childrenRef.current)
      }
    }, 0)
  }

  if (declarations) {
    //TODO throw and handle globaly errors in an alert with a condition to avoid to display alert in prod
    console.error('Only declaration in Question are displayed')
  }

  const hasErrors = errors && errors.length > 0

  return (
    <>
      <label htmlFor={id} id={`label-${id}`}>
        {label}
        {description && <span>{description}</span>}
      </label>
      {hasErrors && (
        <div role="alert">
          {errors.map((error) => {
            if (!error.errorMessage) {
              //TODO throw error
              console.error(`The error : ${error.id} do not contains message`)
              return null
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
      <div ref={childrenRef} tabIndex={-1}>
        {children}
      </div>
      {canControlRows && (
        <ButtonsGroup
          alignment="left"
          buttons={[
            {
              priority: 'secondary',
              children: 'Ajouter une ligne',
              onClick: handleAddRow,
              disabled: !addRow,
            },
            {
              priority: 'tertiary',
              children: 'Supprimer la dernière ligne',
              onClick: handleRemoveRow,
              disabled: !removeRow,
            },
          ]}
          inlineLayoutWhen="md and up"
        />
      )}
    </>
  )
}
