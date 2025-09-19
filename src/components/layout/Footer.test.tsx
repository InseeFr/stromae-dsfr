import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

import { MODE_TYPE } from '@/constants/mode'
import { useMode } from '@/hooks/useMode'
import { OidcProvider } from '@/oidc'
import { renderWithRouter } from '@/utils/tests'

import { Footer } from './Footer'
import { Header } from './Header'

// mock useIsDark to avoid using DSFR context, since it's used for main logo
vi.mock('@codegouvfr/react-dsfr/useIsDark', () => ({
  useIsDark: () => ({ isDark: false }),
}))

vi.mock('@/hooks/useMode')

vi.mock('@/oidc', () => ({
  OidcProvider: ({ children }: { children: React.ReactNode }) => children,
  useOidc: () => ({
    isUserLoggedIn: true,
    logout: vi.fn(),
  }),
}))

/**
 * In every test we also need to render the header for working, since it provides the brandTop to the footer.
 */
describe('Footer', () => {
  beforeAll(() => {
    // Mock env variables
    import.meta.env.LUNATIC_VERSION = '^3.5.2'
    import.meta.env.APP_VERSION = '1.2.3'
  })

  it('navigates to "#" when clicking the home link', async () => {
    const user = userEvent.setup()

    vi.mocked(useMode).mockReturnValueOnce(MODE_TYPE.COLLECT)

    const { getAllByTitle } = renderWithRouter(
      <OidcProvider>
        <Header />
        <Footer />
      </OidcProvider>,
    )

    // both header and footer have the home link button with the same title
    const homeLinks = getAllByTitle(
      'Home - Name of the entity (ministry, state secretariat, government)',
    )
    expect(homeLinks).toHaveLength(2)

    const footerHomeLink = homeLinks[1]

    const initialHref = window.location.href

    await user.click(footerHomeLink)

    await waitFor(() => {
      expect(window.location.href).toBe(`${initialHref}#`)
    })
  })
})
