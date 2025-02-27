import type { ComponentProps, ReactNode } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import { toast } from 'react-hot-toast'

import { isMobileScreen } from '@/utils/isMobileScreen'

type Params = {
  severity: ComponentProps<typeof Alert>['severity']
  title: NonNullable<ReactNode>
  description: NonNullable<ReactNode>
}
export const showToast = (params: Params) => {
  toast.custom(
    () => (
      <Alert
        severity={params.severity}
        title={params.title}
        description={params.description}
        closable
        small
        style={{
          backgroundColor: fr.colors.decisions.background.default.grey.default,
        }}
      />
    ),
    {
      position: isMobileScreen() ? 'bottom-center' : 'top-right',
      duration: 1500,
    },
  )
}

export const dismissAllToasts = () => {
  toast.remove()
}
