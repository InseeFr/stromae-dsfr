import { useEffect, useRef, useState } from 'react'

import { createModal } from '@codegouvfr/react-dsfr/Modal'

import { declareComponentKeys, useTranslation } from '@/i18n'

export type Props = {
  navigatePortal: () => void
  open: boolean
}

/**
 * Modal when the user exits the survey to make sure the user understands
 * that their anwers will be saved
 */
export function ExitModal({ navigatePortal, open }: Props) {
  const wasDisplayed = useRef(false)
  const { t } = useTranslation({ ExitModal })
  const [modal] = useState(() =>
    createModal({
      id: `exitModal`,
      isOpenedByDefault: false,
    }),
  )

  useEffect(() => {
    setTimeout(() => {
      if (!wasDisplayed.current && open) {
        modal.open()
        wasDisplayed.current = true
      }
    }, 50)
  }, [modal, open])

  return (
    <modal.Component
      title={t('title')}
      buttons={[
        {
          doClosesModal: true,
          children: t('button cancel'),
        },
        {
          doClosesModal: true,
          children: t('button validate'),
          onClick: navigatePortal,
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
  'title' | 'button cancel' | 'button validate' | 'content'
>()({ ExitModal })

export type I18n = typeof i18n
