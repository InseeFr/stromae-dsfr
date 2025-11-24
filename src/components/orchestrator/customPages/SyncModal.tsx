import { useEffect, useRef } from 'react'

import { createModal } from '@codegouvfr/react-dsfr/Modal'

import { declareComponentKeys, useTranslation } from '@/i18n'

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
export function SyncModal({ open }: Props) {
  const { t } = useTranslation({ SyncModal })
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
          children: t('button go back'),
          onClick: modal.close,
          nativeButtonProps: { 'data-testid': 'continue-button-sync-modal' },
        },
      ]}
      concealingBackdrop={true}
    >
      {t('content')}
    </modal.Component>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<'title' | 'button go back' | 'content'>()(
  { SyncModal },
)

export type I18n = typeof i18n
