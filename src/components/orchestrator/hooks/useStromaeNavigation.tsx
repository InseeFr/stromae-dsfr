import { useState } from 'react'

import { PAGE_TYPE } from '@/constants/page'
import type { InternalPageType, PageType, StromaePage } from '@/models/Page'
import type {
  LunaticGoNextPage,
  LunaticGoPreviousPage,
  LunaticGoToPage,
} from '@/models/lunaticType'

type Params = {
  isFirstPage?: boolean
  isLastPage?: boolean
  initialCurrentPage?: PageType
  goNextWithControls?: (goNext: () => void) => void
  goNextLunatic?: LunaticGoNextPage
  goPrevLunatic?: LunaticGoPreviousPage
  openValidationModal?: () => Promise<void>
  goToLunaticPage?: LunaticGoToPage
}

/**
 * Hook that manages which page should one navigate to
 */
export function useStromaeNavigation({
  isFirstPage = false,
  isLastPage = false,
  initialCurrentPage = PAGE_TYPE.WELCOME,
  goNextLunatic = () => {},
  goPrevLunatic = () => {},
  goToLunaticPage = () => {},
  openValidationModal = () => new Promise<void>(() => {}),
}: Params) {
  const [currentPage, setCurrentPage] = useState<InternalPageType>(() =>
    initialCurrentPage === PAGE_TYPE.END ? PAGE_TYPE.END : PAGE_TYPE.WELCOME,
  )

  const handleNextPage = () => {
    switch (currentPage) {
      case PAGE_TYPE.VALIDATION:
        openValidationModal().then(() => {
          setCurrentPage(PAGE_TYPE.END)
        })
        return
      case PAGE_TYPE.WELCOME:
        return setCurrentPage(PAGE_TYPE.LUNATIC)
      case PAGE_TYPE.LUNATIC:
        return isLastPage
          ? setCurrentPage(PAGE_TYPE.VALIDATION)
          : goNextLunatic()
      case PAGE_TYPE.END:
        return
    }
  }

  const handlePreviousPage = () => {
    switch (currentPage) {
      case PAGE_TYPE.VALIDATION:
        return setCurrentPage(PAGE_TYPE.LUNATIC)
      case PAGE_TYPE.LUNATIC:
        return isFirstPage ? setCurrentPage(PAGE_TYPE.WELCOME) : goPrevLunatic()
      case PAGE_TYPE.END:
      case PAGE_TYPE.WELCOME:
        return
    }
  }

  const handleGoToPage = (
    params:
      | {
          page: StromaePage
        }
      | Parameters<LunaticGoToPage>[0],
  ) => {
    switch (params.page) {
      case PAGE_TYPE.VALIDATION:
      case PAGE_TYPE.END:
      case PAGE_TYPE.WELCOME:
        setCurrentPage(params.page)
        return
      default:
        // Lunatic page
        setCurrentPage(PAGE_TYPE.LUNATIC)
        goToLunaticPage(params)
    }
  }
  return { handleNextPage, handlePreviousPage, handleGoToPage, currentPage }
}
