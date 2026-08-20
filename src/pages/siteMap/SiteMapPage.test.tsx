import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithi18n } from '@/utils/tests'

import { SiteMapPage } from './SiteMapPage'
import { siteMapRoute } from './route'

vi.mock('@/api/03-questionnaires.ts', () => ({
  useGetQuestionnaireData: vi.fn(),
}))

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
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  }
})

const mockUseGetQuestionnaireData = vi.mocked(
  await import('@/api/03-questionnaires.ts'),
).useGetQuestionnaireData

const mockUseLoaderData = vi.mocked(siteMapRoute.useLoaderData)

describe('SiteMapPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders static footer links when there is no questionnaireId', () => {
    mockUseLoaderData.mockReturnValue({ questionnaireId: undefined })
    mockUseGetQuestionnaireData.mockReturnValue({
      data: undefined,
    } as ReturnType<typeof mockUseGetQuestionnaireData>)

    renderWithi18n(<SiteMapPage />)

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()

    expect(screen.getByText('Accessibility')).toBeInTheDocument()
    expect(screen.getByText('Legal Mentions')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
    expect(screen.getByText('Navigation assistance')).toBeInTheDocument()
  })

  it('renders static footer links when questionnaireData is undefined', () => {
    mockUseLoaderData.mockReturnValue({ questionnaireId: 'q1' })
    mockUseGetQuestionnaireData.mockReturnValue({
      data: undefined,
    } as ReturnType<typeof mockUseGetQuestionnaireData>)

    renderWithi18n(<SiteMapPage />)

    expect(screen.getByText('Accessibility')).toBeInTheDocument()
    expect(screen.queryByText('My Questionnaire')).not.toBeInTheDocument()
  })

  it('renders questionnaire section when data is present', () => {
    mockUseLoaderData.mockReturnValue({ questionnaireId: 'q1' })
    mockUseGetQuestionnaireData.mockReturnValue({
      data: {
        label: { value: 'My Questionnaire' },
        components: [
          {
            id: 'seq1',
            componentType: 'Sequence',
            label: { value: 'Introduction' },
          },
        ],
      },
    } as ReturnType<typeof mockUseGetQuestionnaireData>)

    renderWithi18n(<SiteMapPage />)

    expect(screen.getByText('My Questionnaire')).toBeInTheDocument()
    expect(screen.getByText('Questionnaire structure')).toBeInTheDocument()
    expect(screen.getByText('Introduction')).toBeInTheDocument()
  })

  it('renders subsequences under their parent sequence', () => {
    mockUseLoaderData.mockReturnValue({ questionnaireId: 'q1' })
    mockUseGetQuestionnaireData.mockReturnValue({
      data: {
        label: { value: 'My Questionnaire' },
        components: [
          {
            id: 'seq1',
            componentType: 'Sequence',
            label: { value: 'Main Sequence' },
          },
          {
            id: 'sub1',
            componentType: 'Subsequence',
            label: { value: 'Sub Sequence' },
          },
        ],
      },
    } as ReturnType<typeof mockUseGetQuestionnaireData>)

    renderWithi18n(<SiteMapPage />)

    expect(screen.getByText('Main Sequence')).toBeInTheDocument()
    expect(screen.getByText('Sub Sequence')).toBeInTheDocument()
  })

  it('renders questionnaire header but no sequences when data has no components', () => {
    mockUseLoaderData.mockReturnValue({ questionnaireId: 'q1' })
    mockUseGetQuestionnaireData.mockReturnValue({
      data: {
        label: { value: 'My Questionnaire' },
      },
    } as ReturnType<typeof mockUseGetQuestionnaireData>)

    renderWithi18n(<SiteMapPage />)

    expect(screen.getByText('My Questionnaire')).toBeInTheDocument()
    expect(screen.queryByText('Introduction')).not.toBeInTheDocument()
  })

  it('renders static links with correct hrefs', () => {
    mockUseLoaderData.mockReturnValue({ questionnaireId: undefined })
    mockUseGetQuestionnaireData.mockReturnValue({
      data: undefined,
    } as ReturnType<typeof mockUseGetQuestionnaireData>)

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
