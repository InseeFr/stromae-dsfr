import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as focusUtils from '../utils/focusLastRowInput'
import { Loop } from './Loop'

vi.mock('../utils/focusLastRowInput', () => ({
  focusLastInput: vi.fn(),
}))

const mockFocusLastInput = vi.mocked(focusUtils.focusLastInput)

describe('Loop', () => {
  const defaultProps = {
    id: 'test-loop',
    label: 'Test Loop',
    children: <div>Loop content</div>,
    canControlRows: true,
    addRow: vi.fn(),
    removeRow: vi.fn(),
    executeExpression: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render label and children', () => {
    render(<Loop {...defaultProps} />)

    expect(screen.getByText('Test Loop')).toBeInTheDocument()

    const label = screen.getByText('Test Loop')
    expect(label).toHaveAttribute('id', 'label-test-loop')

    expect(screen.getByText('Loop content')).toBeInTheDocument()
  })

  it('should render description when provided', () => {
    render(<Loop {...defaultProps} description="Test description" />)

    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('should render control buttons when canControlRows is true', () => {
    render(<Loop {...defaultProps} />)

    expect(
      screen.getByRole('button', { name: 'Ajouter une ligne' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Supprimer la dernière ligne' }),
    ).toBeInTheDocument()
  })

  it('should not render control buttons when canControlRows is false', () => {
    render(<Loop {...defaultProps} canControlRows={false} />)

    expect(
      screen.queryByRole('button', { name: 'Ajouter une ligne' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Supprimer la dernière ligne' }),
    ).not.toBeInTheDocument()
  })

  it('should disable add button when addRow is not provided', () => {
    render(<Loop {...defaultProps} addRow={undefined} />)

    const addButton = screen.getByRole('button', { name: 'Ajouter une ligne' })
    expect(addButton).toBeDisabled()
  })

  it('should disable remove button when removeRow is not provided', () => {
    render(<Loop {...defaultProps} removeRow={undefined} />)

    const removeButton = screen.getByRole('button', {
      name: 'Supprimer la dernière ligne',
    })
    expect(removeButton).toBeDisabled()
  })

  it('should render errors when provided', () => {
    const errors = [
      {
        id: 'error1',
        errorMessage: 'First error',
        criticality: 'ERROR' as const,
      },
      {
        id: 'error2',
        errorMessage: 'Second error',
        criticality: 'INFO' as const,
      },
    ]

    render(<Loop {...defaultProps} errors={errors} />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('First error')).toBeInTheDocument()
    expect(screen.getByText('Second error')).toBeInTheDocument()
  })

  it('should not render error container when no errors', () => {
    render(<Loop {...defaultProps} errors={[]} />)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('should call addRow and focus when add button is clicked', async () => {
    render(<Loop {...defaultProps} />)

    const addButton = screen.getByRole('button', { name: 'Ajouter une ligne' })
    fireEvent.click(addButton)

    expect(defaultProps.addRow).toHaveBeenCalled()

    await waitFor(() => {
      expect(mockFocusLastInput).toHaveBeenCalled()
    })
  })

  it('should call removeRow and focus when remove button is clicked', async () => {
    render(<Loop {...defaultProps} />)

    const removeButton = screen.getByRole('button', {
      name: 'Supprimer la dernière ligne',
    })
    fireEvent.click(removeButton)

    expect(defaultProps.removeRow).toHaveBeenCalled()

    await waitFor(() => {
      expect(mockFocusLastInput).toHaveBeenCalled()
    })
  })

  it('should call focusLastInput with correct container', async () => {
    render(<Loop {...defaultProps} />)

    const addButton = screen.getByRole('button', { name: 'Ajouter une ligne' })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(mockFocusLastInput).toHaveBeenCalledWith(
        expect.any(HTMLDivElement),
      )
    })
  })
})
