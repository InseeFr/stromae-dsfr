import { memo, useEffect } from 'react'

const logoutUrl = `${import.meta.env.VITE_PORTAIL_URL}${import.meta.env.VITE_LOGOUT_PATH}`

export const DeconnexionPage = memo(function DeconnexionPage() {
  useEffect(() => {
    window.location.replace(logoutUrl)
  }, [])

  return null
})
