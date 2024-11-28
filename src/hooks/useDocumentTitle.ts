import { decode } from 'he'
import { useEffect, type ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title

    document.title = title

    return () => {
      document.title = prevTitle
    }
  }, [title])
}

export function useSequenceTitle(sequenceLabel: ReactNode) {
  /**
   * This is a dirty, sequenceLabel is today a LabelType VTL|MD,
   * it will be replaced by VTL only so we will be able to just sequenceLabel.toString()
   */
  const renderedString = renderToStaticMarkup(sequenceLabel)

  // Décoder les entités HTML
  const decodedString = decode(renderedString)
  return useDocumentTitle(decodedString)
}
