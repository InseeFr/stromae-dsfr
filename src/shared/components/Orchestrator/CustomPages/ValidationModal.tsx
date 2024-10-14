import { declareComponentKeys, useTranslation } from '@/i18n'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useEffect, useId, useState, type MutableRefObject } from 'react'
import { assert } from 'tsafe/assert'

export type Props = {
  actionsRef: MutableRefObject<{
    open?: () => Promise<void>
  }>
}
export function ValidationModal({ actionsRef }: Props) {
  const id = useId()

  const { t } = useTranslation({ ValidationModal })
  const [modal] = useState(() =>
    createModal({
      id: `validationModal-${id}`,
      isOpenedByDefault: false,
    })
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
      title={t('title')}
      buttons={[
        {
          doClosesModal: true, //Default true, clicking a button close the modal.
          children: t('button cancel'),
        },
        {
          doClosesModal: true,
          children: t('button validate'),
          onClick: () => {
            assert(openState !== undefined)
            openState.resolve()
            setOpenState(undefined)
          },
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
>()({ ValidationModal })

export type I18n = typeof i18n
