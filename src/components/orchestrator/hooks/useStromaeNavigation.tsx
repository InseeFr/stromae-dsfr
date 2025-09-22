import { useState } from 'react'

import { PAGE_TYPE } from '@/constants/page'
import type {
  LunaticGoNextPage,
  LunaticGoPreviousPage,
  LunaticGoToPage,
} from '@/models/lunaticType'
import type { InternalPageType, PageType, StromaePage } from '@/models/page'

type Params = {
  isFirstPage?: boolean
  isLastPage?: boolean
  initialCurrentPage?: PageType
  goNextWithControls?: (goNext: () => void) => void
  goNextLunatic?: LunaticGoNextPage
  goPrevLunatic?: LunaticGoPreviousPage
  openValidationModal?: () => Promise<void>
  goToLunaticPage?: LunaticGoToPage
  validateQuestionnaire?: () => Promise<void>
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
  validateQuestionnaire = () => new Promise<void>(() => {}),
}: Params) {
  const [currentPageType, setCurrentPageType] = useState<InternalPageType>(
    () =>
      initialCurrentPage === PAGE_TYPE.END ? PAGE_TYPE.END : PAGE_TYPE.WELCOME,
  )

  const goNext = async () => {
    switch (currentPageType) {
      case PAGE_TYPE.VALIDATION:
        await openValidationModal()
        try {
          await validateQuestionnaire()
          setCurrentPageType(PAGE_TYPE.END)
        } catch {
          /** We stay on the validation page if validation fails (network issue).
           * No need to log th error since it's already handled by validation function. */
        }
        return
      case PAGE_TYPE.WELCOME:
        return setCurrentPageType(PAGE_TYPE.LUNATIC)
      case PAGE_TYPE.LUNATIC:
        return isLastPage
          ? setCurrentPageType(PAGE_TYPE.VALIDATION)
          : goNextLunatic()
      case PAGE_TYPE.END:
        return
    }
  }

  const goPrevious = () => {
    switch (currentPageType) {
      case PAGE_TYPE.VALIDATION:
        return setCurrentPageType(PAGE_TYPE.LUNATIC)
      case PAGE_TYPE.LUNATIC:
        return isFirstPage
          ? setCurrentPageType(PAGE_TYPE.WELCOME)
          : goPrevLunatic()
      case PAGE_TYPE.END:
      case PAGE_TYPE.WELCOME:
        return
    }
  }

  const goToPage = (
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
        setCurrentPageType(params.page)
        return
      default:
        // Lunatic page
        setCurrentPageType(PAGE_TYPE.LUNATIC)
        goToLunaticPage(params)
    }
  }
  return { goNext, goPrevious, goToPage, currentPageType }
}
