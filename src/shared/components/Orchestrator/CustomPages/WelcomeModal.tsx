import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { declareComponentKeys, useTranslation } from 'i18n'
import { useEffect, useRef } from 'react'

const modal = createModal({
  id: `welcomeModal`,
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
    // Since dsfr uses MutationObserver we need to wait a bit to ensure the element is correctly picked up by window.dsfr
    setTimeout(() => {
      if (!wasDisplayed.current && open) {
        modal.open()
        wasDisplayed.current = true
      }
    }, 10)
  }, [open])

  return (
    <modal.Component
      title={t('title')}
      buttons={[
        {
          doClosesModal: true, //Default true, clicking a button close the modal.
          children: t('button first page'),
        },
        {
          doClosesModal: true,
          children: t('button go back'),
          onClick: goBack,
        },
      ]}
      concealingBackdrop={true}
    >
      {t('content')}
    </modal.Component>
  )
}

const { i18n } = declareComponentKeys<
  'title' | 'button first page' | 'button go back' | 'content'
>()({ WelcomeModal })

export type I18n = typeof i18n
