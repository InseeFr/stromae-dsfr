import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import { executePreLogoutActions } from '@/hooks/prelogout'
import { useOidc } from '@/oidc'

export function AutoLogoutCountdown() {
  const { t } = useTranslation()
  const { autoLogoutState } = useOidc()

  useEffect(() => {
    if (autoLogoutState.shouldDisplayWarning) {
      ;(async () => {
        await executePreLogoutActions()
      })()
    }
  }, [autoLogoutState.shouldDisplayWarning])

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
        <p>{t('header.stillThere')}</p>
        <p>{t('header.loggedOutIn', { secondsLeft })}</p>
      </div>
    </div>
  )
}
