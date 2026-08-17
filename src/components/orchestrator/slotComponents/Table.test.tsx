import React from 'react'

import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useTableCellAriaLabelledby } from '@/hooks/useTableCell'
import { renderWithi18n } from '@/utils/tests'

import { Table, Td, Th, Thead, Tr } from './Table'

const CellField = () => {
  const ariaLabelledby = useTableCellAriaLabelledby('fallback')
  return <input aria-labelledby={ariaLabelledby} />
}

const cellProps = {
  id: 'cell',
  handleChanges: () => undefined,
  value: null,
}

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

  it('should give headers an id and label fields by their column header and row number', () => {
    const { container } = renderWithi18n(
      <Table id="table-1" errors={[]} label="Test Table">
        <div
          {...({
            header: [{ label: 'Header 1' }, { label: 'Header 2' }],
          } as any)}
        />
        <Thead>
          <Tr row={0}>
            <Th index={0}>Header 1</Th>
            <Th index={1}>Header 2</Th>
          </Tr>
        </Thead>
        <tbody>
          <Tr row={0}>
            <Td {...cellProps} index={0}>
              <CellField />
            </Td>
            <Td {...cellProps} index={1}>
              <CellField />
            </Td>
          </Tr>
        </tbody>
      </Table>,
    )

    const table = container.querySelector('table')!
    const headerThs = table.querySelectorAll('th[id*="header"]')
    expect(headerThs).toHaveLength(2)

    // The header row must not get a row header, only the body rows do
    const rowHeaderThs = table.querySelectorAll('th[scope="row"]')
    expect(rowHeaderThs).toHaveLength(1)

    const rowTh = rowHeaderThs[0]
    expect(rowTh).toHaveTextContent(/1/)
    expect(rowTh).toHaveAttribute(
      'id',
      `${headerThs[0].id.split('-header-')[0]}-row-0`,
    )

    const inputs = container.querySelectorAll('input')
    expect(inputs[0]).toHaveAttribute(
      'aria-labelledby',
      `${headerThs[0].id} ${rowTh.id}`,
    )
    expect(inputs[1]).toHaveAttribute(
      'aria-labelledby',
      `${headerThs[1].id} ${rowTh.id}`,
    )
  })

  it('should not label fields when the table has no header', () => {
    const { container } = renderWithi18n(
      <Table id="table-1" errors={[]} label="Test Table">
        <Tr row={0}>
          <Td {...cellProps} index={0}>
            <CellField />
          </Td>
        </Tr>
      </Table>,
    )

    const rowTh = container.querySelector('th[scope="row"]')
    expect(rowTh).toBeNull()

    const input = container.querySelector('input')!
    expect(input).toHaveAttribute('aria-labelledby', 'fallback')
  })
})
