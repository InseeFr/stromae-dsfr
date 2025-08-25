import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Textarea } from './Textarea'

describe('Textarea', () => {
  const mockOnChange = vi.fn()
  const baseProps = {
    value: 'textarea',
    id: 'textarea',
    response: { name: 'demo' },
    onChange: mockOnChange,
  }

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('should only display the value when readOnly', () => {
    const { container, getByText } = render(
      <Textarea {...baseProps} id="textarea" value="toto" readOnly />,
    )

    const input = container.querySelector('textarea')
    expect(input).toBeNull()

    expect(getByText('toto')).toBeInTheDocument()
  })
})
