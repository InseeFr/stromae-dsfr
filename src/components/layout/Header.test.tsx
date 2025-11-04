import { useSearch } from '@tanstack/react-router'
import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

import { MODE_TYPE } from '@/constants/mode'
import { TELEMETRY_EVENT_TYPE } from '@/constants/telemetry'
import { TelemetryContext } from '@/contexts/TelemetryContext'
import { useMode } from '@/hooks/useMode'
import { OidcProvider } from '@/oidc'
import { renderWithRouter } from '@/utils/tests'

import { Footer } from './Footer'
import { Header } from './Header'

vi.stubEnv('APP_VERSION', '1.0.0')
vi.stubEnv('LUNATIC_VERSION', '^3.7.2')

// mock useIsDark to avoid using DSFR context, since it's used for main logo
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
    isUserLoggedIn: true,
    logout: vi.fn(),
  }),
}))

describe('Header & Footer', () => {
  it('triggers telemetry contact support event', async () => {
    const user = userEvent.setup()
    const pushEvent = vi.fn()

    vi.mocked(useMode).mockReturnValueOnce(MODE_TYPE.COLLECT)

    const { getAllByText } = renderWithRouter(
      <OidcProvider>
        <TelemetryContext.Provider
          value={{
            isTelemetryDisabled: false,
            pushEvent,
            setDefaultValues: () => {},
          }}
        >
          <Header />
        </TelemetryContext.Provider>
      </OidcProvider>,
    )

    await waitFor(() => expect(pushEvent).not.toHaveBeenCalled())

    const e = getAllByText('Need help?')[0]
    await user.click(e)

    await waitFor(() => expect(pushEvent).toHaveBeenCalledOnce())
    await waitFor(() =>
      expect(pushEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: TELEMETRY_EVENT_TYPE.CONTACT_SUPPORT,
        }),
      ),
    )
  })

  it('does not trigger telemetry contact support event when not in collect mode', async () => {
    const user = userEvent.setup()
    const pushEvent = vi.fn()

    vi.mocked(useMode).mockReturnValueOnce(MODE_TYPE.VISUALIZE)

    const { getAllByText } = renderWithRouter(
      <OidcProvider>
        <TelemetryContext.Provider
          value={{
            isTelemetryDisabled: false,
            pushEvent,
            setDefaultValues: () => {},
          }}
        >
          <Header />
        </TelemetryContext.Provider>
      </OidcProvider>,
    )

    await waitFor(() => expect(pushEvent).not.toHaveBeenCalled())

    const e = getAllByText('Need help?')[0]
    await user.click(e)

    await waitFor(() => expect(pushEvent).not.toHaveBeenCalled())
  })

  it('does not trigger telemetry contact support event when telemetry is disabled', async () => {
    const user = userEvent.setup()
    const pushEvent = vi.fn()

    vi.mocked(useMode).mockReturnValueOnce(MODE_TYPE.COLLECT)

    const { getAllByText } = renderWithRouter(
      <OidcProvider>
        <TelemetryContext.Provider
          value={{
            isTelemetryDisabled: true,
            pushEvent,
            setDefaultValues: () => {},
          }}
        >
          <Header />
        </TelemetryContext.Provider>
      </OidcProvider>,
    )

    await waitFor(() => expect(pushEvent).not.toHaveBeenCalled())

    const e = getAllByText('Need help?')[0]
    await user.click(e)

    await waitFor(() => expect(pushEvent).not.toHaveBeenCalled())
  })

  it('should not display toast on exit', async () => {
    const user = userEvent.setup()
    const showToast = vi.fn()

    const { getAllByText } = renderWithRouter(
      <OidcProvider>
        <TelemetryContext.Provider
          value={{
            isTelemetryDisabled: false,
            pushEvent: vi.fn(),
            setDefaultValues: () => {},
          }}
        >
          <Header />
        </TelemetryContext.Provider>
      </OidcProvider>,
    )
    await waitFor(() => expect(showToast).not.toHaveBeenCalled())

    const exitButton = getAllByText('Back to the portal')[0]
    await user.click(exitButton)

    const confirmButton = getAllByText('I understand')[0]
    await user.click(confirmButton)

    await waitFor(() => expect(showToast).not.toHaveBeenCalled())
  })

  it('navigates to "#" when clicking the home link', async () => {
    const user = userEvent.setup()

    vi.mocked(useMode).mockReturnValueOnce(MODE_TYPE.COLLECT)

    const { getAllByTitle } = renderWithRouter(
      <OidcProvider>
        <TelemetryContext.Provider
          value={{
            isTelemetryDisabled: false,
            pushEvent: vi.fn(),
            setDefaultValues: () => {},
          }}
        >
          <Header />
          <Footer />
        </TelemetryContext.Provider>
      </OidcProvider>,
    )

    const homeLinks = getAllByTitle(
      'Home - Name of the entity (ministry, state secretariat, government)',
    )
    expect(homeLinks).toHaveLength(2)
    const initialHref = window.location.href

    await user.click(homeLinks[0])

    await waitFor(() => {
      expect(window.location.href).toBe(`${initialHref}#`)
    })
  })

  it('home links in Header and Footer have correct href', () => {
    vi.mocked(useMode).mockReturnValueOnce(MODE_TYPE.COLLECT)

    const { getAllByTitle } = renderWithRouter(
      <OidcProvider>
        <TelemetryContext.Provider
          value={{
            isTelemetryDisabled: false,
            pushEvent: vi.fn(),
            setDefaultValues: () => {},
          }}
        >
          <Header />
          <Footer />
        </TelemetryContext.Provider>
      </OidcProvider>,
    )

    const homeLinks = getAllByTitle(
      'Home - Name of the entity (ministry, state secretariat, government)',
    )

    expect(homeLinks).toHaveLength(2)
    homeLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '#')
    })
  })

  it('clicking home links navigates to hash', async () => {
    const user = userEvent.setup()
    vi.mocked(useMode).mockReturnValueOnce(MODE_TYPE.COLLECT)

    const { getAllByTitle } = renderWithRouter(
      <OidcProvider>
        <TelemetryContext.Provider
          value={{
            isTelemetryDisabled: false,
            pushEvent: vi.fn(),
            setDefaultValues: () => {},
          }}
        >
          <Header />
          <Footer />
        </TelemetryContext.Provider>
      </OidcProvider>,
    )

    const homeLinks = getAllByTitle(
      'Home - Name of the entity (ministry, state secretariat, government)',
    )

    expect(homeLinks).toHaveLength(2)

    const initialHref = window.location.href

    await user.click(homeLinks[0])
    expect(window.location.href).toBe(`${initialHref.replace('#', '')}#`)

    await user.click(homeLinks[1])
    expect(window.location.href).toContain('#')
  })

  it('displays surveyUnitLabel when present in search params', async () => {
    vi.mocked(useSearch).mockReturnValue({
      surveyUnitLabel: 'TXkgVGVzdCBMYWJlbA',
    })

    vi.mocked(useMode).mockReturnValueOnce(MODE_TYPE.COLLECT)

    const { getByText } = renderWithRouter(
      <OidcProvider>
        <TelemetryContext.Provider
          value={{
            isTelemetryDisabled: false,
            pushEvent: vi.fn(),
            setDefaultValues: () => {},
          }}
        >
          <Header />
        </TelemetryContext.Provider>
      </OidcProvider>,
    )

    await waitFor(() => {
      expect(getByText('My Test Label')).toBeInTheDocument()
    })
  })
})
