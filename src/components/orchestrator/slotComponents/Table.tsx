import React, { createContext, useContext, useId } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import type { LunaticSlotComponents } from '@inseefr/lunatic'

import { useQuestionId } from './Question'

// Context to track the first cell ID and whether to use row labeling
const RowContext = createContext<{
  firstCellId?: string
  cellIndex: number
  useRowLabeling: boolean
}>({
  cellIndex: 0,
  useRowLabeling: false,
})

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
  const hasHeader = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.props.header !== undefined,
  )

  const hasErrors = errors && errors.length > 0

  return (
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
                <RowContext.Provider
                  value={{ cellIndex: 0, useRowLabeling: !hasHeader }}
                >
                  {children}
                </RowContext.Provider>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const Tr: LunaticSlotComponents['Tr'] = (props) => {
  const { children, className } = props
  const rowId = useId()
  const { useRowLabeling } = useContext(RowContext)

  const rowHasErrors = className
    ? ['lunatic-row-has-error'].includes(className)
    : false
  const rowDisplayError = className
    ? ['lunatic-errors'].includes(className)
    : false

  const firstCellId = `${rowId}-label`

  // Only apply row labeling for tables without headers
  const labelledChildren = useRowLabeling
    ? (() => {
        let cellIndex = 0
        return React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const currentIndex = cellIndex++
            return (
              <RowContext.Provider
                value={{
                  firstCellId,
                  cellIndex: currentIndex,
                  useRowLabeling: true,
                }}
              >
                {child}
              </RowContext.Provider>
            )
          }
          return child
        })
      })()
    : children

  return (
    <tr
      {...(useRowLabeling ? { 'aria-labelledby': firstCellId } : {})}
      {...(rowHasErrors ? { 'aria-invalid': true } : {})}
      style={
        rowDisplayError
          ? {
              color: fr.colors.decisions.background.flat.error.default,
            }
          : {}
      }
    >
      {labelledChildren}
    </tr>
  )
}

export const Td: LunaticSlotComponents['Td'] = (props) => {
  const { children, colSpan, rowSpan } = props as any

  const { firstCellId, cellIndex, useRowLabeling } = useContext(RowContext)

  // Only add id to first cell if row labeling is enabled (no header)
  const id = useRowLabeling && cellIndex === 0 ? firstCellId : undefined

  return (
    <td
      className={fr.cx('fr-text--md')}
      colSpan={colSpan}
      rowSpan={rowSpan}
      {...(id ? { id } : {})}
    >
      {children}
    </td>
  )
}
