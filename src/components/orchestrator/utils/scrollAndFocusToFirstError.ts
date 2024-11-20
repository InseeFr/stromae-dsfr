export function scrollAndFocusToFirstError() {
  const errorElement = document.querySelector<HTMLElement>(
    '[aria-invalid="true"],[role="alert"]',
  )

  if (errorElement) {
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    focusElementOrNearest(errorElement)
  }
}

function focusElementOrNearest(element: HTMLElement) {
  if (typeof element.focus === 'function') {
    element.focus()
  } else if (element.parentElement) {
    focusElementOrNearest(element.parentElement)
  }
}
