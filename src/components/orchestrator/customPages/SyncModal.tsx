import { useEffect, useRef } from 'react'

import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useTranslation } from 'react-i18next'

const modal = createModal({
  id: 'syncModal',
  isOpenedByDefault: false,
})

type Props = {
  // Toggle opening the modal (will have no effect if the modal was already opened once)
  open: boolean
}

/**
 * Modal displayed at the start of the form (showed once per navigation)
 */
export function SyncModal({ open }: Readonly<Props>) {
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
      title={t('welcome.syncModal.title')}
      concealingBackdrop={true}
    >
      {t('welcome.syncModal.content')}
    </modal.Component>
  )
}
