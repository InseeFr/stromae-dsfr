import { PAGE_TYPE } from '@/constants/page'
import type { InternalPageType, PageType, StromaePage } from '@/model/Page'
import { useState } from 'react'
import { assert, type Equals } from 'tsafe/assert'
import type {
  LunaticGoNextPage,
  LunaticGoPreviousPage,
  LunaticGoToPage,
} from './utils/lunaticType'

type Params = {
  isFirstPage: boolean
  isLastPage: boolean
  initialCurrentPage: PageType | undefined
  goNextWithControls: (goNext: () => void) => void
  goNextLunatic: LunaticGoNextPage
  goPrevLunatic: LunaticGoPreviousPage
  openValidationModal: () => Promise<void>
  goToLunaticPage: LunaticGoToPage
}

export function useStromaeNavigation({
  isFirstPage,
  isLastPage,
  initialCurrentPage = PAGE_TYPE.WELCOME,
  goNextWithControls,
  goNextLunatic,
  goPrevLunatic,
  goToLunaticPage,
  openValidationModal,
}: Params) {
  const [currentPage, setCurrentPage] = useState<InternalPageType>(() =>
    initialCurrentPage === PAGE_TYPE.END ? PAGE_TYPE.END : PAGE_TYPE.WELCOME,
  )

  const goNextFromLunaticPage = (isLastPage: boolean) => {
    const goNext = isLastPage
      ? () => setCurrentPage(PAGE_TYPE.VALIDATION)
      : goNextLunatic
    return goNextWithControls(goNext)
  }

  const goNext = () => {
    switch (currentPage) {
      case PAGE_TYPE.VALIDATION:
        openValidationModal().then(() => {
          setCurrentPage(PAGE_TYPE.END)
        })
        return
      case PAGE_TYPE.WELCOME:
        return setCurrentPage(PAGE_TYPE.LUNATIC)
      case PAGE_TYPE.LUNATIC:
        return goNextFromLunaticPage(isLastPage)
      case PAGE_TYPE.END:
        return
    }
    assert<Equals<typeof currentPage, never>>(false)
  }
  const goPrevious = () => {
    switch (currentPage) {
      case PAGE_TYPE.VALIDATION:
        return setCurrentPage(PAGE_TYPE.LUNATIC)
      case PAGE_TYPE.LUNATIC:
        return isFirstPage ? setCurrentPage(PAGE_TYPE.WELCOME) : goPrevLunatic()
      case PAGE_TYPE.END:
      case PAGE_TYPE.WELCOME:
        return
    }
    assert<Equals<typeof currentPage, never>>(false)
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
        setCurrentPage(params.page)
        return
      default:
        // Lunatic page
        setCurrentPage(PAGE_TYPE.LUNATIC)
        goToLunaticPage(params)
    }
  }
  return { goNext, goPrevious, goToPage, currentPage }
}
