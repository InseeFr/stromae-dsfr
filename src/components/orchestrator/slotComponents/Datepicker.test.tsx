import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { type DateFormat, Datepicker } from './Datepicker'

describe('Datepicker Component', () => {
  const onChangeMock = vi.fn()
  const defaultProps = {
    id: 'my-id',
    value: '2024-01-01',
    response: { name: 'date' },
    onChange: onChangeMock,
  }

  beforeEach(() => {
    onChangeMock.mockClear()
  })

  const dateFormats: DateFormat[] = ['YYYY-MM-DD', 'YYYY-MM', 'YYYY']

  dateFormats.forEach((format) => {
    it(`should render properly with format ${format}`, () => {
      const { getByRole } = render(
        <Datepicker {...defaultProps} dateFormat={format} />,
      )

      const field = getByRole('group')
      expect(field).toBeInTheDocument()
    })
  })

  it('handle change correctly for format YYYY-MM-DD', () => {
    const { container, getByRole } = render(
      <Datepicker {...defaultProps} dateFormat="YYYY-MM-DD" />,
    )

    const field = getByRole('group')
    const input = container.querySelector<HTMLInputElement>(
      'input.MuiPickersInputBase-input',
    )!
    expect(input).not.toBeNull()

    // handle valid dates
    fireEvent.change(input, { target: { value: '05/02/2025' } })
    fireEvent.blur(field)
    expect(onChangeMock).toHaveBeenCalledWith('2025-02-05')

    // handle invalid dates
    fireEvent.change(input, { target: { value: '29/02/2025' } })
    fireEvent.blur(field)
    expect(onChangeMock).toHaveBeenCalledWith(null)

    // handle year with less than 4 digits, and month/day with 1 digit
    fireEvent.change(input, { target: { value: '8/5/25' } })
    fireEvent.blur(field)
    expect(onChangeMock).toHaveBeenCalledWith('0025-05-08')
  })

  it('handle change correctly for format YYYY-MM', () => {
    const { container, getByRole } = render(
      <Datepicker {...defaultProps} dateFormat="YYYY-MM" value="2024-01" />,
    )

    const field = getByRole('group')
    const input = container.querySelector<HTMLInputElement>(
      'input.MuiPickersInputBase-input',
    )!

    fireEvent.change(input, { target: { value: '02/2025' } })
    fireEvent.blur(field)
    expect(onChangeMock).toHaveBeenCalledWith('2025-02')

    // handle year with less than 4 digits, and month with 1 digit
    fireEvent.change(input, { target: { value: '5/25' } })
    fireEvent.blur(field)
    expect(onChangeMock).toHaveBeenCalledWith('0025-05')
  })

  it('handle change correctly for format YYYY', () => {
    const { container, getByRole } = render(
      <Datepicker {...defaultProps} dateFormat="YYYY" value="2024" />,
    )

    const field = getByRole('group')
    const input = container.querySelector<HTMLInputElement>(
      'input.MuiPickersInputBase-input',
    )!

    fireEvent.change(input, { target: { value: '2025' } })
    fireEvent.blur(field)
    expect(onChangeMock).toHaveBeenCalledWith('2025')

    // handle year with less than 4 digits
    fireEvent.change(input, { target: { value: '25' } })
    fireEvent.blur(field)
    expect(onChangeMock).toHaveBeenCalledWith('0025')
  })

  it('handle change correctly clicking the clear button', () => {
    const { getByRole } = render(
      <Datepicker {...defaultProps} dateFormat="YYYY-MM-DD" />,
    )

    // Click on the clear button
    const clearButton = getByRole('button', { name: 'Effacer la valeur' })
    fireEvent.click(clearButton)

    expect(onChangeMock).toHaveBeenCalledWith(null)
  })
})
