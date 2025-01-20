import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

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

vi.mock('i18nifty')

describe('AccessibilityPage', () => {
  it('render with correct elements', () => {
    const { getByText } = render(<AccessibilityPage />)

    const title = screen.getAllByText('accessibility title')
    expect(title).toHaveLength(2)

    expect(getByText(`conformity status title`)).toBeInTheDocument()

    expect(getByText(`feedback contact title`)).toBeInTheDocument()

    expect(getByText(`recourse title`)).toBeInTheDocument()
  })

  it('should render a breadcrumb', () => {
    render(<AccessibilityPage />)
    const breadcrumb = screen.getByTestId('breadcrumb')
    expect(breadcrumb).toBeInTheDocument()
  })

  it('should render exactly four sections', () => {
    render(<AccessibilityPage />)
    const sections = document.querySelectorAll('section')
    expect(sections).toHaveLength(4)
  })
})
