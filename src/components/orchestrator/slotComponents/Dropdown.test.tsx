import { MDLabel } from '@inseefr/lunatic'
import { render, screen } from '@testing-library/react'
import { type Mock, describe, expect, it, vi } from 'vitest'

import { Dropdown } from './Dropdown'
import { getErrorStates } from './utils/errorStates'

vi.mock('react', async (importOriginal) => {
  // needs to import the actual React module, else it does not work
  const actual = (await importOriginal()) as typeof import('react')
  return {
    ...actual,
    useId: vi.fn(() => 'mock-id'),
  }
})

vi.mock('./utils/errorStates', () => ({
  getErrorStates: vi.fn(),
}))

describe('Dropdown Component', () => {
  // this case must not be happen in future (Eno make option as VTL label, and not VTL|MD lavel for DropdownOptions)
  // MD si invalid inside <option> html tag
  // should remove MDLabel in this test
  it('renders the options correctly with MD', () => {
    ;(getErrorStates as Mock).mockReturnValue({
      state: 'default',
      stateRelatedMessage: undefined,
    })

    const mockOnChange = vi.fn()

    const dProps = {
      id: 'my-id',
      label: 'Dropdown Label',
      description: 'Dropdown Description',
      onChange: mockOnChange,
      options: [
        {
          value: 'enfant',
          label: <MDLabel expression="L'enfant" />,
        },
        {
          value: 'bold',
          label: 'With some **bold**',
        },
      ],
      value: null,
    }

    render(<Dropdown {...dProps} />)

    const options = screen
      .getAllByRole('option')
      // remove the disabled option  ("Select an option")
      .filter((option) => !option.hasAttribute('disabled'))
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveTextContent("L'enfant")
    expect(options[1]).toHaveTextContent('With some **bold**')
    console.log('options[1]', options[1])
  })
})
