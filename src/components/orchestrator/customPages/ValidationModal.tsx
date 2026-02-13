import { type MutableRefObject, useEffect, useId, useState } from 'react'

import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useTranslation } from 'react-i18next'
import { assert } from 'tsafe/assert'

export type Props = {
  actionsRef: MutableRefObject<{
    open?: () => Promise<void>
  }>
}

/**
 * Modal displayed at the end of the survey to make sure the user understands
 * they won't be able to change their answers once submitted
 */
export function ValidationModal({ actionsRef }: Props) {
  const id = useId()

  const { t } = useTranslation()
  const [modal] = useState(() =>
    createModal({
      id: `validationModal-${id}`,
      isOpenedByDefault: false,
    }),
  )

  const [openState, setOpenState] = useState<
    | {
        resolve: () => void
      }
    | undefined
  >(undefined)

  useEffect(() => {
    actionsRef.current.open = () =>
      new Promise<void>((resolve) => {
        setOpenState({ resolve })
        modal.open()
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <modal.Component
      title={t('validation.validationModal.title')}
      buttons={[
        {
          doClosesModal: true, //Default true, clicking a button close the modal.
          children: t('validation.validationModal.buttonCancel'),
          nativeButtonProps: {
            'data-testid': 'cancel-button-validation-modal',
          },
        },
        {
          doClosesModal: true,
          children: t('validation.validationModal.buttonValidate'),
          onClick: () => {
            assert(openState !== undefined)
            openState.resolve()
            setOpenState(undefined)
          },
          nativeButtonProps: {
            'data-testid': 'validate-button-validation-modal',
          },
        },
      ]}
      concealingBackdrop={true}
    >
      {t('validation.validationModal.content')}
    </modal.Component>
  )
}
