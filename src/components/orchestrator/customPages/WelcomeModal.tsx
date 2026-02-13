import { useEffect, useRef } from 'react'

import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useTranslation } from 'react-i18next'

const modal = createModal({
  id: 'welcomeModal',
  isOpenedByDefault: false,
})

type Props = {
  // Resume navigation to the previous initial page
  goBack: () => void
  // Toggle opening the modal (will have no effect if the modal was already opened once)
  open: boolean
}

/**
 * Modal displayed at the start of the form (showed once per navigation)
 */
export function WelcomeModal({ goBack, open }: Props) {
  const { t } = useTranslation()
  const wasDisplayed = useRef(false)

  useEffect(() => {
    // Since dsfr uses MutationObserver we need to wait a bit to ensure the element is correctly picked up by window.dsfr (cf https://github.com/GouvernementFR/dsfr/issues/979)
    setTimeout(() => {
      if (!wasDisplayed.current && open) {
        modal.open()
        wasDisplayed.current = true
      }
    }, 50)
  }, [open])

  return (
    <modal.Component
      title={t('welcome.welcomeModal.title')}
      buttons={[
        {
          doClosesModal: true,
          children: t('welcome.welcomeModal.buttonFirstPage'),
          nativeButtonProps: {
            'data-testid': 'back-to-start-button-welcome-modal',
          },
        },
        {
          doClosesModal: true,
          children: t('welcome.welcomeModal.buttonGoBack'),
          onClick: goBack,
          nativeButtonProps: { 'data-testid': 'continue-button-welcome-modal' },
        },
      ]}
      concealingBackdrop={true}
    >
      {t('welcome.welcomeModal.content')}
    </modal.Component>
  )
}
