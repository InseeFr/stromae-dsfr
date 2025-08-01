import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { InputNumber } from './InputNumber'

describe('InputNumber', () => {
  const mockOnChange = vi.fn()

  const baseProps = {
    onChange: mockOnChange,
    response: { name: 'demo' },
    value: 10,
    id: 'number',
    'aria-labelledby': 'input',
  }

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('renders label and input', () => {
    const labelText = 'Enter a number'
    const { container } = render(
      <InputNumber {...baseProps} label={labelText} onChange={mockOnChange} />,
    )

    const label = screen.getByText(labelText)
    const input = container.querySelector('input[type="text"]')

    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })

  it('renders with value', () => {
    const { container } = render(<InputNumber {...baseProps} />)

    const input = container.querySelector('input[type="text"]')

    expect(input).toHaveValue('10')
  })

  it('calls onChange with parsed value', () => {
    const { container } = render(<InputNumber {...baseProps} id="number" />)

    const input = container.querySelector('input[type="text"]')!
    fireEvent.change(input, { target: { value: '12' } })

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(12)
  })

  it('renders unit element as placeholder if provided', () => {
    const { container } = render(
      <InputNumber
        {...baseProps}
        id="input-number-test"
        label="Input Number"
        unit="kg"
      />,
    )
    const input = container.querySelector('input[type="text"]')
    expect(input).toHaveAttribute('placeholder', 'kg')
  })

  it('renders unit element as suffix if a value is provided', () => {
    const { container } = render(
      <InputNumber
        {...baseProps}
        id="input-number-test"
        label="Input Number"
        unit="kg"
      />,
    )
    const input = container.querySelector('input[type="text"]')
    expect(input).toHaveValue('10 kg')
  })

  it('disables input when disabled prop is true', () => {
    const { container } = render(<InputNumber {...baseProps} disabled />)

    const input = container.querySelector('input[type="text"]')
    expect(input).toBeDisabled()
  })

  it('should only display the value when readOnly', () => {
    const { getByText, container } = render(
      <InputNumber {...baseProps} readOnly />,
    )

    const input = container.querySelector('input[type="text"]')
    expect(input).toBeNull()

    expect(getByText('10')).toBeInTheDocument()
  })

  it('should display input value from the start when user leave input', () => {
    const setSelectionRangeMock = vi.fn()
    const { container } = render(
      <InputNumber
        {...baseProps}
        value={100000000000000000000000000000000000}
      />,
    )

    const input = container.querySelector('input[type="text"]')

    fireEvent.blur(input!, {
      target: {
        ...input,
        setSelectionRange: setSelectionRangeMock,
      },
    })
    expect(setSelectionRangeMock).toHaveBeenCalledWith(0, 0)
  })

  it('should have the proper title', async () => {
    const { getByTitle } = render(
      <InputNumber {...baseProps} value={100000} unit="€" />,
    )
    expect(getByTitle((content) => content.includes('€'))).toBeInTheDocument()
  })

  it('should have the proper title when equal to 0', async () => {
    const { getByTitle } = render(
      <InputNumber {...baseProps} value={0} unit="€" />,
    )
    expect(getByTitle('0 €')).toBeInTheDocument()
  })
})
