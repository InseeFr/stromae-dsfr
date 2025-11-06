/** Focus to the last input element within a container */
export function focusLastInput(container: HTMLElement) {
  // It may be interesting to separate each case into different functions or to separate Loop and rosterForLoop components
  const table = container.querySelector('table')

  if (table) {
    const allRows = table.querySelectorAll(
      'tbody tr, tr',
    ) as NodeListOf<HTMLTableRowElement>
    if (allRows.length > 0) {
      const lastRow = allRows[allRows.length - 1]
      const firstInputInLastRow = lastRow.querySelector(
        'input',
      ) as HTMLInputElement
      if (firstInputInLastRow) {
        firstInputInLastRow.focus()
        return
      }
    }
  }

  const allInputs = container.querySelectorAll(
    'input',
  ) as NodeListOf<HTMLInputElement>
  if (allInputs.length > 0) {
    allInputs[allInputs.length - 1].focus()
    return
  }

  const lastDiv = container.querySelector('div:last-child') as HTMLElement
  if (lastDiv) {
    if (!lastDiv.hasAttribute('tabindex')) {
      lastDiv.setAttribute('tabindex', '-1')
    }
    lastDiv.focus()
    return
  }

  container.focus()
}
