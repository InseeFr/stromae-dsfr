import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithi18n } from '@/utils/tests'

import { AccessibilityPage } from './AccessibilityPage'

vi.mock('@/components/Grid', () => ({
  Grid: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="grid">{children}</div>
  ),
}))
vi.mock('@codegouvfr/react-dsfr/Breadcrumb', () => ({
  Breadcrumb: ({ currentPageLabel }: { currentPageLabel: string }) => (
    <nav data-testid="breadcrumb">{currentPageLabel}</nav>
  ),
}))

describe('AccessibilityPage', () => {
  it('render with correct elements', () => {
    const { getByText } = renderWithi18n(<AccessibilityPage />)

    const title = screen.getAllByText('Accessibility')
    expect(title).toHaveLength(2)

    expect(getByText(`Conformity Status`)).toBeInTheDocument()

    expect(getByText(`Feedback and Contact`)).toBeInTheDocument()

    expect(getByText(`Recourse`)).toBeInTheDocument()
  })

  it('should render a breadcrumb', () => {
    renderWithi18n(<AccessibilityPage />)
    const breadcrumb = screen.getByTestId('breadcrumb')
    expect(breadcrumb).toBeInTheDocument()
  })

  it('should render exactly four sections', () => {
    renderWithi18n(<AccessibilityPage />)
    const sections = document.querySelectorAll('section')
    expect(sections).toHaveLength(4)
  })
})
