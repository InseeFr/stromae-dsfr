import { MODE_TYPE } from '@/constants/mode'
import { TELEMETRY_EVENT_TYPE } from '@/constants/telemetry'
import { TelemetryContext } from '@/contexts/TelemetryContext'
import { OidcProvider } from '@/oidc'
import { useMode } from '@/shared/hooks/useMode'
import { renderWithRouter } from '@/utils/tests'
import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import { Header } from './Header'

vi.mock('@/shared/hooks/useMode')

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

    const e = getAllByText('Contact support')[0]
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

    const e = getAllByText('Contact support')[0]
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

    const e = getAllByText('Contact support')[0]
    await user.click(e)

    await waitFor(() => expect(pushEvent).not.toHaveBeenCalled())
  })
})
