import { declareComponentKeys } from 'i18nifty'

import { useTranslation } from '@/i18n'
import { useOidc } from '@/oidc'

export function AutoLogoutCountdown() {
  const { t } = useTranslation({ AutoLogoutCountdown })
  const { autoLogoutState } = useOidc()

  if (!autoLogoutState.shouldDisplayWarning) {
    return null
  }

  const secondsLeft = autoLogoutState.secondsLeftBeforeAutoLogout

  return (
    <div
      // Full screen overlay, blurred background
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p>{t('paragraph still there')}</p>
        <p>{t('paragraph logged out in', { secondsLeft })}</p>
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  | 'paragraph still there'
  | {
      K: 'paragraph logged out in'
      P: { secondsLeft: number }
      R: string
    }
>()({ AutoLogoutCountdown })
export type I18n = typeof i18n
