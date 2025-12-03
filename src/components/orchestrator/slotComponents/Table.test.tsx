import React from 'react'

import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Table } from './Table'

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
