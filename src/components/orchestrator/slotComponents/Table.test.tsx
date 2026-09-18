import React, { useContext } from 'react'

import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { RowLabelContext } from '@/hooks/useRowLabelId.ts'

import { Table, Td, Tr } from './Table'

describe('Table Component', () => {
  it('should add role="presentation" when children have undefined header prop', () => {
    const mockChildren = [
      React.createElement(
        'th',
        { key: '0', header: undefined },
        React.createElement('td', {}, ''),
      ),
      React.createElement(
        'tr',
        { key: '1' },
        React.createElement('td', {}, 'Cell 1'),
      ),
      React.createElement(
        'tr',
        { key: '2' },
        React.createElement('td', {}, 'Cell 2'),
      ),
    ]

    const props = {
      id: 'table-1',
      errors: [],
      label: 'Test Table',
      children: mockChildren,
    }

    const { container, getByText } = render(<Table {...props} />)

    const table = container.querySelector('table')
    expect(table).toHaveAttribute('role', 'presentation')

    expect(getByText('Cell 1')).toBeInTheDocument()
    expect(getByText('Cell 2')).toBeInTheDocument()
  })

  it('should not add role="presentation" when children have defined header prop', () => {
    const mockChildren = [
      React.createElement(
        'th',
        { key: '0', header: 'Header 1' },
        React.createElement('td', {}, ''),
      ),
      React.createElement(
        'tr',
        { key: '1' },
        React.createElement('td', {}, 'Cell 1'),
      ),
      React.createElement(
        'tr',
        { key: '2' },
        React.createElement('td', {}, 'Cell 2'),
      ),
    ]

    const props = {
      id: 'table-1',
      errors: [],
      label: 'Test Table',
      children: mockChildren,
    }

    const { container, getByText } = render(<Table {...props} />)

    const table = container.querySelector('table')
    expect(table).not.toHaveAttribute('role', 'presentation')

    expect(getByText('Cell 1')).toBeInTheDocument()
    expect(getByText('Cell 2')).toBeInTheDocument()
  })
})

describe('Tr Component', () => {
  it('provides rowLabelId via context to children', () => {
    const TestChild = () => {
      const rowLabelId = useContext(RowLabelContext)
      return <span data-testid="row-label-id">{rowLabelId}</span>
    }

    const { getByTestId } = render(
      <table>
        <tbody>
          <Tr>
            <td>
              <TestChild />
            </td>
          </Tr>
        </tbody>
      </table>,
    )

    expect(getByTestId('row-label-id').textContent).toBeTruthy()
  })
})

describe('Td Component', () => {
  const baseTdProps = {
    id: 'test-id',
    handleChanges: vi.fn(),
    value: null,
  }

  it('wraps first column children in a div with rowLabelId', () => {
    const { container } = render(
      <table>
        <tbody>
          <RowLabelContext.Provider value="test-row-id">
            <tr>
              <Td index={0} {...baseTdProps}>
                First Column
              </Td>
            </tr>
          </RowLabelContext.Provider>
        </tbody>
      </table>,
    )

    const div = container.querySelector('div#test-row-id')
    expect(div).toBeInTheDocument()
    expect(div).toHaveTextContent('First Column')
  })

  it('does not wrap non-first column children', () => {
    const { container } = render(
      <table>
        <tbody>
          <RowLabelContext.Provider value="test-row-id">
            <tr>
              <Td index={1} {...baseTdProps}>
                Second Column
              </Td>
            </tr>
          </RowLabelContext.Provider>
        </tbody>
      </table>,
    )

    const div = container.querySelector('div#test-row-id')
    expect(div).not.toBeInTheDocument()
  })
})
