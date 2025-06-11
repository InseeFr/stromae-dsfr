import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

import { MODE_TYPE } from '@/constants/mode'
import { TELEMETRY_EVENT_TYPE } from '@/constants/telemetry'
import { TelemetryContext } from '@/contexts/TelemetryContext'
import { useMode } from '@/hooks/useMode'
import { OidcProvider } from '@/oidc'
import { renderWithRouter } from '@/utils/tests'

import { Header } from './Header'

vi.mock('@/hooks/useMode')

vi.mock('@/oidc', () => ({
  OidcProvider: ({ children }: { children: React.ReactNode }) => children,
  useOidc: () => ({
    isUserLoggedIn: true,
    logout: vi.fn(),
  }),
}))

describe('Header', () => {
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

    const { getByTitle } = renderWithRouter(
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

    const homeLink = getByTitle(
      'Home - Name of the entity (ministry, state secretariat, government)',
    )
    const initialHref = window.location.href

    await user.click(homeLink)

    await waitFor(() => {
      expect(window.location.href).toBe(`${initialHref}#`)
    })
  })
})
