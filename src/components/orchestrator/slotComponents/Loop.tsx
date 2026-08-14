import { useId, useState } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import type { LunaticSlotComponents } from '@inseefr/lunatic'
import { useTranslation } from 'react-i18next'

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

  const { t } = useTranslation()

  if (declarations) {
    //TODO throw and handle globaly errors in an alert with a condition to avoid to display alert in prod
    console.error('Only declaration in Question are displayed')
  }

  const hasErrors = errors && errors.length > 0

  const modalId = useId()
  const [modal] = useState(() =>
    createModal({
      id: `loop-remove-modal-${modalId}`,
      isOpenedByDefault: false,
    }),
  )

  const handleOpenRemoveModal = () => {
    modal.open()
  }

  const handleConfirmRemove = () => {
    if (removeRow) {
      removeRow()
    }
  }

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
      {children}
      {canControlRows && (
        <ButtonsGroup
          alignment="left"
          buttons={[
            {
              priority: 'secondary',
              children: t('collectPage.loop.addRow'),
              onClick: addRow,
              disabled: !addRow,
            },
            {
              priority: 'tertiary',
              children: t('collectPage.loop.removeRow'),
              onClick: handleOpenRemoveModal,
              disabled: !removeRow,
            },
          ]}
          inlineLayoutWhen="md and up"
        />
      )}
      <modal.Component
        title={t('collectPage.loop.removeRowModal.title')}
        buttons={[
          {
            children: t('collectPage.loop.removeRowModal.buttonCancel'),
            doClosesModal: true,
          },
          {
            children: t('collectPage.loop.removeRowModal.buttonValidate'),
            doClosesModal: true,
            onClick: handleConfirmRemove,
          },
        ]}
        concealingBackdrop={true}
      >
        {t('collectPage.loop.removeRowModal.content')}
      </modal.Component>
    </>
  )
}
