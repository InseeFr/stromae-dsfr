import { createContext, useContext } from 'react'

import type { TableCellContextValue } from '@/models/table'

export type TableContextValue = {
  tableId: string
  hasHeader: boolean
}

export const TableContext = createContext<TableContextValue | undefined>(
  undefined,
)

export const useTableContext = () => useContext(TableContext)

export const RowContext = createContext<{ rowId: string } | undefined>(
  undefined,
)

export const useRowContext = () => useContext(RowContext)

export const TableCellContext = createContext<
  TableCellContextValue | undefined
>(undefined)

/**
 * Gives the column header (and row) identifiers to fields rendered inside a
 * table cell so they can be labelled by their column header instead of the
 * section title. Returns `undefined` when not rendered inside a table.
 */
export const useTableCellContext = () => useContext(TableCellContext)

/**
 * Builds the `aria-labelledby` value for a field: inside a table cell it
 * references the column header (and the row number) instead of the fallback
 * (usually the question id).
 */
export const useTableCellAriaLabelledby = (fallback?: string) => {
  const tableCell = useTableCellContext()
  if (tableCell === undefined) {
    return fallback
  }
  return [tableCell.headerId, tableCell.rowId].filter(Boolean).join(' ')
}
