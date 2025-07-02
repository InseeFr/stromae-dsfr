import { useEffect, useRef } from 'react'

import { createModal } from '@codegouvfr/react-dsfr/Modal'

import { declareComponentKeys, useTranslation } from '@/i18n'

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
  const { t } = useTranslation({ WelcomeModal })
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
      title={t('title')}
      buttons={[
        {
          doClosesModal: true,
          children: t('button first page'),
          nativeButtonProps: {
            'data-testid': 'back-to-start-button-welcome-modal',
          },
        },
        {
          doClosesModal: true,
          children: t('button go back'),
          onClick: goBack,
          nativeButtonProps: { 'data-testid': 'continue-button-welcome-modal' },
        },
      ]}
      concealingBackdrop={true}
    >
      {t('content')}
    </modal.Component>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  'title' | 'button first page' | 'button go back' | 'content'
>()({ WelcomeModal })

export type I18n = typeof i18n
