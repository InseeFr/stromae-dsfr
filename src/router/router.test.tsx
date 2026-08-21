import { waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { MODE_TYPE } from '@/constants/mode'
import { TelemetryContext } from '@/contexts/TelemetryContext'
import { useMode } from '@/hooks/useMode'
import { renderWithRouter } from '@/utils/tests'

vi.stubEnv('APP_VERSION', '1.0.0')
vi.stubEnv('LUNATIC_VERSION', '^3.7.2')

vi.mock('@codegouvfr/react-dsfr/useIsDark', () => ({
  useIsDark: () => ({ isDark: false }),
}))

vi.mock('@/hooks/useMode')

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    (await importOriginal()) as typeof import('@tanstack/react-router')
  return {
    ...actual,
    useSearch: vi.fn(),
  }
})

vi.mock('@/oidc', () => ({
  OidcProvider: ({ children }: { children: React.ReactNode }) => children,
  useOidc: () => ({
    isUserLoggedIn: false,
    logout: vi.fn(),
  }),
}))

describe('Skip link tests', () => {
  it('renders the footer with id="footer" so the skip link redirect to the footer of the page', async () => {
    vi.mocked(useMode).mockReturnValue(MODE_TYPE.VISUALIZE)

    const { container } = renderWithRouter(
      <TelemetryContext.Provider
        value={{
          isTelemetryEnabled: false,
          pushEvent: vi.fn(),
          setDefaultValues: () => {},
        }}
      >
        <Header />
        <Footer />
      </TelemetryContext.Provider>,
    )

    await waitFor(() => {
      expect(container.querySelector('footer')).not.toBeNull()
    })

    const footer = container.querySelector('footer')
    expect(footer).toHaveAttribute('id', 'footer')
    expect(document.getElementById('footer')).toBe(footer)
  })
})
