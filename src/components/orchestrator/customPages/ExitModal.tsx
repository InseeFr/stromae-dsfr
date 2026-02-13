import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useTranslation } from 'react-i18next'

export type Props = {
  modal: ReturnType<typeof createModal>
  navigatePortal: () => void
}

/**
 * Modal when the user exits the survey to make sure the user understands
 * that their anwers will be saved
 */
export function ExitModal({ modal, navigatePortal }: Readonly<Props>) {
  const { t } = useTranslation()

  return (
    <modal.Component
      title={t('collectPage.exitModal.title')}
      buttons={[
        {
          doClosesModal: true,
          children: t('collectPage.exitModal.buttonCancel'),
        },
        {
          doClosesModal: true,
          children: t('collectPage.exitModal.buttonValidate'),
          onClick: navigatePortal,
        },
      ]}
      concealingBackdrop={true}
    >
      {t('collectPage.exitModal.content')}
    </modal.Component>
  )
}
