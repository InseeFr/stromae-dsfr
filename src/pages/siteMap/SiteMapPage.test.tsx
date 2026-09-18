import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithi18n } from '@/utils/tests'

import { SiteMapPage } from './SiteMapPage'
import { siteMapRoute } from './route'

vi.mock('./route', () => ({
  siteMapRoute: {
    useLoaderData: vi.fn(),
  },
}))

vi.mock('@codegouvfr/react-dsfr/Breadcrumb', () => ({
  Breadcrumb: ({ currentPageLabel }: { currentPageLabel: string }) => (
    <nav data-testid="breadcrumb">{currentPageLabel}</nav>
  ),
}))

vi.mock('@codegouvfr/react-dsfr', () => ({
  fr: {
    cx: (...classes: string[]) => classes.join(' '),
  },
}))

vi.mock('@/components/Grid', () => ({
  Grid: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="grid">{children}</div>
  ),
}))

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    (await importOriginal()) as typeof import('@tanstack/react-router')
  return {
    ...actual,
    Link: ({
      to,
      params,
      children,
    }: {
      to: string
      params?: { interrogationId: string }
      children: React.ReactNode
    }) => (
      <a
        href={
          params ? to.replace('$interrogationId', params.interrogationId) : to
        }
      >
        {children}
      </a>
    ),
  }
})

const mockUseLoaderData = vi.mocked(siteMapRoute.useLoaderData)

describe('SiteMapPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('renders static footer links when there is no interrogationId', () => {
    mockUseLoaderData.mockReturnValue({ interrogationId: undefined })

    renderWithi18n(<SiteMapPage />)

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()

    expect(screen.getByText('Accessibility')).toBeInTheDocument()
    expect(screen.getByText('Legal Mentions')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
    expect(screen.getByText('Navigation assistance')).toBeInTheDocument()
  })

  it('does not render a back link without an interrogationId', () => {
    mockUseLoaderData.mockReturnValue({ interrogationId: undefined })

    renderWithi18n(<SiteMapPage />)

    expect(screen.queryByText('Questionnaire')).not.toBeInTheDocument()
  })

  it('renders a link back to the questionnaire when interrogationId is present', () => {
    mockUseLoaderData.mockReturnValue({ interrogationId: 'i1' })

    renderWithi18n(<SiteMapPage />)

    const backLink = screen.getByText('Back to the questionnaire').closest('a')
    expect(backLink).toHaveAttribute('href', '/interrogations/i1')
  })

  it('render a link to the portal or exit url when interrogationId is present', () => {
    vi.stubEnv('VITE_PORTAIL_URL', 'https://portal-link.fr/')
    vi.stubEnv('VITE_EXIT_PATH', 'exit')
    mockUseLoaderData.mockReturnValue({ interrogationId: 'i1' })

    renderWithi18n(<SiteMapPage />)

    const backLink = screen.getByText('Portal').closest('a')
    expect(backLink).toHaveAttribute('href', 'https://portal-link.fr/exit')
  })

  it('renders static links with correct hrefs', () => {
    mockUseLoaderData.mockReturnValue({ interrogationId: undefined })

    renderWithi18n(<SiteMapPage />)

    const accessibilityLink = screen.getByText('Accessibility').closest('a')
    const legalLink = screen.getByText('Legal Mentions').closest('a')
    const securityLink = screen.getByText('Security').closest('a')
    const navigationLink = screen
      .getByText('Navigation assistance')
      .closest('a')

    expect(accessibilityLink).toHaveAttribute('href', '/accessibilite')
    expect(legalLink).toHaveAttribute('href', '/mentions-legales')
    expect(securityLink).toHaveAttribute('href', '/securite')
    expect(navigationLink).toHaveAttribute('href', '/aide-a-la-navigation')
  })
})
