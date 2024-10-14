import { useTranslation } from '@/i18n'
import { useOidc } from '@/oidc'
import { declareComponentKeys } from 'i18nifty'
import { useEffect, useState } from 'react'

export function AutoLogoutCountdown() {
  const { isUserLoggedIn, subscribeToAutoLogoutCountdown } = useOidc()
  const [secondsLeft, setSecondsLeft] = useState<number | undefined>(undefined)

  const { t } = useTranslation({ AutoLogoutCountdown })
  useEffect(
    () => {
      if (!isUserLoggedIn) {
        return
      }

      const { unsubscribeFromAutoLogoutCountdown } =
        subscribeToAutoLogoutCountdown(({ secondsLeft }) =>
          setSecondsLeft(
            secondsLeft === undefined || secondsLeft > 60
              ? undefined
              : secondsLeft
          )
        )

      return () => {
        unsubscribeFromAutoLogoutCountdown()
      }
    },
    // NOTE: These dependency array could very well be empty
    // we're just making react-hooks/exhaustive-deps happy.
    // Unless you're hot swapping the oidc context isUserLoggedIn
    // and subscribeToAutoLogoutCountdown never change for the
    // lifetime of the app.
    [isUserLoggedIn, subscribeToAutoLogoutCountdown]
  )

  if (secondsLeft === undefined) {
    return null
  }

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
