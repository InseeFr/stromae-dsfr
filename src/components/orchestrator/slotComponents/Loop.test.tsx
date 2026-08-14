import userEvent from '@testing-library/user-event'
import { expect, vi } from 'vitest'

import { renderWithi18n } from '@/utils/tests'

import { Loop } from './Loop'

// Needed to avoid TypeError: window.dsfr is not a function during test
vi.mock('@codegouvfr/react-dsfr/Modal', () => ({
  createModal: () => ({
    open: vi.fn(),
    close: vi.fn(),
    Component: ({
      children,
      title,
      buttons,
    }: {
      children: React.ReactNode
      title: string
      buttons?: Array<{
        children: React.ReactNode
        doClosesModal?: boolean
        onClick?: () => void
        nativeButtonProps?: Record<string, unknown>
      }>
    }) => (
      <div data-testid="modal" role="dialog" aria-label={title}>
        <h2>{title}</h2>
        {children}
        {buttons && (
          <div>
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                {...(button.nativeButtonProps || {})}
              >
                {button.children}
              </button>
            ))}
          </div>
        )}
      </div>
    ),
  }),
}))

const baseProps = {
  id: 'loop-id',
  label: 'Test Loop Label',
  description: undefined,
  declarations: undefined,
  canControlRows: true,
  errors: [],
  addRow: vi.fn(),
  removeRow: vi.fn(),
  children: <div data-testid="loop-children">Children content</div>,
  executeExpression: vi.fn(),
  lines: { min: 0, max: 10 },
  iterations: 1,
  getComponents: () => [],
  value: {},
}

describe('Loop', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders label and children', () => {
    const { getByText, getByTestId } = renderWithi18n(<Loop {...baseProps} />)

    expect(getByText('Test Loop Label')).toBeInTheDocument()
    expect(getByTestId('loop-children')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    const { getByText } = renderWithi18n(
      <Loop {...baseProps} description="Test description" />,
    )

    expect(getByText('Test description')).toBeInTheDocument()
  })

  it('renders error alerts when errors exist', () => {
    const errors = [
      {
        id: 'error-1',
        errorMessage: 'First error',
        criticality: 'ERROR',
        typeOfControl: 'ROW',
      },
      {
        id: 'error-2',
        errorMessage: 'Second error',
        criticality: 'ERROR',
        typeOfControl: 'ROW',
      },
    ]

    const { getByText } = renderWithi18n(
      <Loop {...baseProps} errors={errors} />,
    )

    expect(getByText('First error')).toBeInTheDocument()
    expect(getByText('Second error')).toBeInTheDocument()
  })

  it('does not render control buttons when canControlRows is false', () => {
    const { queryByRole } = renderWithi18n(
      <Loop {...baseProps} canControlRows={false} />,
    )

    expect(queryByRole('button', { name: /Add a row/i })).toBeNull()
    expect(queryByRole('button', { name: /Remove last row/i })).toBeNull()
  })

  it('renders control buttons when canControlRows is true', () => {
    const { getByRole } = renderWithi18n(<Loop {...baseProps} />)

    expect(getByRole('button', { name: /Add a row/i })).toBeInTheDocument()
    expect(
      getByRole('button', { name: /Remove last row/i }),
    ).toBeInTheDocument()
  })

  it('calls addRow when add row button is clicked', async () => {
    const user = userEvent.setup()
    const addRowMock = vi.fn()

    const { getByRole } = renderWithi18n(
      <Loop {...baseProps} addRow={addRowMock} />,
    )

    const addButton = getByRole('button', { name: /Add a row/i })
    await user.click(addButton)

    expect(addRowMock).toHaveBeenCalledTimes(1)
  })

  it('renders remove row confirmation modal', () => {
    const { getByTestId, getByRole } = renderWithi18n(<Loop {...baseProps} />)

    expect(getByTestId('modal')).toBeInTheDocument()
    expect(getByRole('button', { name: /Cancel/i })).toBeInTheDocument()
    expect(getByRole('button', { name: /Confirm/i })).toBeInTheDocument()
  })

  it('calls removeRow when validate button in modal is clicked', async () => {
    const user = userEvent.setup()
    const removeRowMock = vi.fn()

    const { getByRole } = renderWithi18n(
      <Loop {...baseProps} removeRow={removeRowMock} />,
    )

    const validateButton = getByRole('button', { name: /Confirm/i })
    await user.click(validateButton)

    expect(removeRowMock).toHaveBeenCalledTimes(1)
  })

  it('does not call removeRow when cancel button in modal is clicked', async () => {
    const user = userEvent.setup()
    const removeRowMock = vi.fn()

    const { getByRole } = renderWithi18n(
      <Loop {...baseProps} removeRow={removeRowMock} />,
    )

    const cancelButton = getByRole('button', { name: /Cancel/i })
    await user.click(cancelButton)

    expect(removeRowMock).not.toHaveBeenCalled()
  })

  it('disables add row button when addRow is undefined', () => {
    const { getByRole } = renderWithi18n(
      <Loop {...baseProps} addRow={undefined} />,
    )

    const addButton = getByRole('button', { name: /Add a row/i })
    expect(addButton).toBeDisabled()
  })

  it('disables remove row button when removeRow is undefined', () => {
    const { getByRole } = renderWithi18n(
      <Loop {...baseProps} removeRow={undefined} />,
    )

    const removeButton = getByRole('button', { name: /Remove last row/i })
    expect(removeButton).toBeDisabled()
  })
})
