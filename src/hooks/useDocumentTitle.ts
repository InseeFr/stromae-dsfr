import { type ReactNode, useEffect } from 'react'

import { decode } from 'he'
import { renderToStaticMarkup } from 'react-dom/server'

export function useDocumentTitle(title: string, questionnaireLabel?: string) {
  useEffect(() => {
    const fullTitle = questionnaireLabel
      ? `${questionnaireLabel} - ${title}`
      : title
    const prevTitle = document.title
    document.title = fullTitle

    return () => {
      document.title = prevTitle
    }
  }, [title, questionnaireLabel])
}

export function useSequenceTitle(
  sequenceLabel: ReactNode,
  isDirtyState: boolean = false,
) {
  /**
   * This is a dirty, sequenceLabel is today a LabelType VTL|MD,
   * it will be replaced by VTL only so we will be able to just sequenceLabel.toString()
   */
  const renderedString = renderToStaticMarkup(sequenceLabel)

  // Décoder les entités HTML
  const decodedString = decode(renderedString)
  return useDocumentTitle(`${isDirtyState ? '*' : ''}${decodedString}`)
}
