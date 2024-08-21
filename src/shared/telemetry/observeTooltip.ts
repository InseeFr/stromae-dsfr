// Observer configuration
const observerConfig: MutationObserverInit = {
  attributes: true,
  attributeFilter: ['class'], //We just need to observe the class
}

const observeTooltips = (callback: MutationCallback): MutationObserver => {
  // Select all elements with the role tooltip
  const tooltipElements = document.querySelectorAll('[role="tooltip"]')

  // Create the observer
  const observer = new MutationObserver(callback)

  // Observe each tooltip element
  tooltipElements.forEach((element) =>
    observer.observe(element, observerConfig)
  )

  // Return the observer in case the caller wants to disconnect it later
  return observer
}

const customMutationHandler: MutationCallback = (mutationsList) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type === 'attributes') {
      const target = mutation.target as HTMLElement
      //The DSFR tooltip appeared when it has this className
      if (target.classList.contains('fr-tooltip--shown')) {
        console.log('Tooltip visible:', target)
      } else {
        console.log('Tooltip caché:', target)
      }
    }
  })
}

observeTooltips(customMutationHandler)

// observer.disconnect();
