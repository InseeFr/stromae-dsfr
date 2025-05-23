import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Suggester } from './Suggester'

describe('Suggester', () => {
  const baseOptions = [
    { id: '1', value: 'France' },
    { id: '2', value: 'Francais' },
    { id: '3', value: 'Francois' },
  ]

  const mockOnClear = vi.fn()

  const baseProps = {
    value: [{ id: '1', value: 'France' }],
    id: 'input',
    options: baseOptions,
    response: { name: 'demo' },
    search: 'France',
    state: 'success',
    onBlur: vi.fn(),
    onChange: vi.fn(),
    onClear: mockOnClear,
    onFocus: vi.fn(),
    onSearch: vi.fn(),
    onSelect: vi.fn(),
    labelRenderer: vi.fn(),
    optionRenderer: vi.fn(),
  } as any

  it('renders label and input', () => {
    const labelText = 'Chose an option'
    const { container } = render(<Suggester {...baseProps} label={labelText} />)

    const label = screen.getByText(labelText)
    const input = container.querySelector('textarea')

    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })

  it('calls onClear when clear button is clicked', () => {
    const { getByRole } = render(<Suggester {...baseProps} />)

    const clearButton = getByRole('button', { name: 'vider le champ' })
    fireEvent.click(clearButton)

    expect(mockOnClear).toHaveBeenCalled()
  })

  it('disables clear button when value and search are empty', () => {
    const { getByRole } = render(
      <Suggester {...baseProps} value={[]} search="" />,
    )

    const clearButton = getByRole('button', { name: 'vider le champ' })
    expect(clearButton).toBeDisabled()
  })

  it('disables input when disabled prop is true', () => {
    const { container } = render(
      <Suggester {...baseProps} disabled errors={undefined} />,
    )

    const input = container.querySelector('textarea')
    expect(input).toBeDisabled()
  })

  it('should handle readOnly, also disabling clear button', () => {
    const { getByRole, container } = render(
      <Suggester {...baseProps} readOnly errors={undefined} />,
    )

    const input = container.querySelector('textarea')
    expect(input).toHaveAttribute('readonly')

    const clearButton = getByRole('button', { name: 'vider le champ' })
    expect(clearButton).toBeDisabled()

    // focus input
    ;(input as HTMLElement).focus()
    expect(input).toHaveFocus()
    expect(input).toHaveValue('France')
  })
})
