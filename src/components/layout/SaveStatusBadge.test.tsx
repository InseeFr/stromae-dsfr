import { expect } from 'vitest'

import { SAVE_STATUS } from '@/constants/saveStatus'
import { renderWithi18n } from '@/utils/tests'

import { SaveStatusBadge } from './SaveStatusBadge'

const HELP_TEXT =
  'Your responses are automatically saved each time a page loads'

describe('SaveStatusBadge', () => {
  it('displays the help text', () => {
    const { getByText } = renderWithi18n(
      <SaveStatusBadge saveStatus={SAVE_STATUS.IDLE} />,
    )

    expect(getByText(HELP_TEXT)).toBeInTheDocument()
  })

  it('does not render a badge when status is IDLE', () => {
    const { queryByRole } = renderWithi18n(
      <SaveStatusBadge saveStatus={SAVE_STATUS.IDLE} />,
    )

    expect(queryByRole('status')).not.toBeInTheDocument()
  })

  it('renders a badge without severity when status is SAVING', () => {
    const { getByRole, getByText, getByLabelText } = renderWithi18n(
      <SaveStatusBadge saveStatus={SAVE_STATUS.SAVING} />,
    )

    const badge = getByLabelText('Your responses are being saved')
    expect(getByRole('status')).toBeInTheDocument()
    expect(getByText('Responses not saved')).toBeInTheDocument()
    expect(badge).not.toHaveClass('fr-badge--success')
    expect(badge).not.toHaveClass('fr-badge--error')
  })

  it('renders a success badge when status is SAVED', () => {
    const { getByRole, getByText, getByLabelText } = renderWithi18n(
      <SaveStatusBadge saveStatus={SAVE_STATUS.SAVED} />,
    )

    const badge = getByLabelText('Your responses have been saved successfully')
    expect(getByRole('status')).toBeInTheDocument()
    expect(getByText('Responses saved')).toBeInTheDocument()
    expect(badge).toHaveClass('fr-badge--success')
  })

  it('renders an error badge when status is ERROR', () => {
    const { getByRole, getByText, getByLabelText } = renderWithi18n(
      <SaveStatusBadge saveStatus={SAVE_STATUS.ERROR} />,
    )

    const badge = getByLabelText(
      'Unable to save responses, they will be sent on the next attempt',
    )
    expect(getByRole('status')).toBeInTheDocument()
    expect(getByText('Unable to save responses')).toBeInTheDocument()
    expect(badge).toHaveClass('fr-badge--error')
  })
})
