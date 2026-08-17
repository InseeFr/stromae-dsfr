import React, { useId } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import type { LunaticSlotComponents } from '@inseefr/lunatic'
import { useTranslation } from 'react-i18next'

import {
  RowContext,
  TableCellContext,
  TableContext,
  TheadContext,
  useRowContext,
  useTableContext,
  useTheadContext,
} from '@/hooks/useTableCell'

import { useQuestionId } from './Question'

export const Table: LunaticSlotComponents['Table'] = (props) => {
  const { children, errors, declarations, label } = props

  const id = useId()
  const questionId = useQuestionId()
  const errorMessageId = `${id}-messages`

  if (declarations) {
    //TODO throw and handle globaly errors in an alert with a condition to avoid to display alert in prod
    console.error('Only declaration in Question are displayed')
  }

  // Since the only way to detect if the table is a table with MCQ with code list is that there is no header
  // We check if one of the children (usually the first one) has a header prop defined

  const hasHeader = React.Children.toArray(children).some((child) => {
    if (React.isValidElement(child)) {
      return typeof (child.props as any).header !== 'undefined'
    }
    return false
  })
  const hasErrors = errors && errors.length > 0

  return (
    <TableContext.Provider value={{ tableId: id, hasHeader }}>
      <>
        {hasErrors && (
          <div id={errorMessageId} role="alert" className={fr.cx('fr-mb-2v')}>
            {errors.map((error) => {
              if (!error.errorMessage) {
                console.error(
                  `The error : ${JSON.stringify(error)} do not contains message`,
                )
                return
              }
              return (
                <Alert
                  severity="error"
                  description={error.errorMessage}
                  small
                  key={error.id}
                  id={error.id}
                />
              )
            })}
          </div>
        )}
        <div id={id} className={fr.cx('fr-table', 'fr-table--lg', 'fr-mt-0')}>
          <div className={fr.cx('fr-table__wrapper')}>
            <div className={fr.cx('fr-table__container')}>
              <div className={fr.cx('fr-table__content')}>
                <table
                  className={fr.cx('fr-cell--multiline')}
                  aria-describedby={label ? undefined : questionId}
                  {...(hasHeader ? {} : { role: 'presentation' })}
                  {...(hasErrors
                    ? {
                        'aria-invalid': true,
                        'aria-errormessage': errorMessageId,
                      }
                    : {})}
                >
                  {label && <caption>{label}</caption>}
                  {children}
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    </TableContext.Provider>
  )
}

export const Tr: LunaticSlotComponents['Tr'] = (props) => {
  const { children, className, row } = props
  const { t } = useTranslation()
  const tableContext = useTableContext()
  const inHeader = useTheadContext()
  const rowHasErrors = className
    ? ['lunatic-row-has-error'].includes(className)
    : false
  const rowDisplayError = className
    ? ['lunatic-errors'].includes(className)
    : false
  //TODO To improve accessibilité we should add aria-labelledBy and "aria-errormessage" but we can't with this component structure
  const rowId =
    tableContext?.tableId !== undefined && row !== undefined
      ? `${tableContext.tableId}-row-${row}`
      : undefined
  const rowNumber = row !== undefined ? Number(row) + 1 : undefined
  // Only render the visually hidden row header ("Ligne N") for tables component
  // as tables without headers (MCQ) have no column header to point fields
  const displayRowHeader =
    !inHeader &&
    tableContext?.hasHeader &&
    rowId !== undefined &&
    rowNumber !== undefined

  return (
    <RowContext.Provider value={rowId ? { rowId } : undefined}>
      <tr
        {...(rowHasErrors ? { 'aria-invalid': true } : {})}
        style={
          rowDisplayError
            ? {
                color: fr.colors.decisions.background.flat.error.default,
              }
            : {}
        }
      >
        {displayRowHeader && (
          <th scope="row" id={rowId} className={fr.cx('fr-sr-only')}>
            {t('collectPage.table.rowLabel', { rowNumber })}
          </th>
        )}
        {children}
      </tr>
    </RowContext.Provider>
  )
}

export const Th: LunaticSlotComponents['Th'] = (props) => {
  const { children, className, colSpan, rowSpan, index } = props
  const tableContext = useTableContext()
  const id =
    tableContext?.tableId !== undefined && index !== undefined
      ? `${tableContext.tableId}-header-${index}`
      : undefined

  return (
    <th
      id={id}
      className={['lunatic-table-th', className].filter(Boolean).join(' ')}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </th>
  )
}

export const Thead: LunaticSlotComponents['Thead'] = (props) => {
  const { children, className } = props
  return (
    <TheadContext.Provider value={true}>
      <thead
        className={['lunatic-table-thead', className].filter(Boolean).join(' ')}
      >
        {children}
      </thead>
    </TheadContext.Provider>
  )
}

export const Td: LunaticSlotComponents['Td'] = (props) => {
  const { children, colSpan, rowSpan, index } = props
  const tableContext = useTableContext()
  const rowContext = useRowContext()

  const headerId =
    tableContext?.hasHeader &&
    tableContext.tableId !== undefined &&
    index !== undefined
      ? `${tableContext.tableId}-header-${index}`
      : undefined
  const rowId = rowContext?.rowId

  return (
    <TableCellContext.Provider
      value={headerId !== undefined ? { headerId, rowId } : undefined}
    >
      <td className={fr.cx('fr-text--md')} colSpan={colSpan} rowSpan={rowSpan}>
        {children}
      </td>
    </TableCellContext.Provider>
  )
}
