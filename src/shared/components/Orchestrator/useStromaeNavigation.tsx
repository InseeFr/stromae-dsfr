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
  initialCurrentPage = 'welcomePage',
  goNextWithControls,
  goNextLunatic,
  goPrevLunatic,
  goToLunaticPage,
  openValidationModal,
}: Params) {
  const [currentPage, setCurrentPage] = useState<InternalPageType>(() =>
    initialCurrentPage === 'endPage' ? 'endPage' : 'welcomePage'
  )

  const goNextFromLunaticPage = (isLastPage: boolean) => {
    const goNext = isLastPage
      ? () => setCurrentPage('validationPage')
      : goNextLunatic
    return goNextWithControls(goNext)
  }

  const goNext = () => {
    switch (currentPage) {
      case 'validationPage':
        openValidationModal().then(() => {
          setCurrentPage('endPage')
        })
        return
      case 'welcomePage':
        return setCurrentPage('lunaticPage')
      case 'lunaticPage':
        return goNextFromLunaticPage(isLastPage)
      case 'endPage':
        return
    }
    assert<Equals<typeof currentPage, never>>(false)
  }
  const goPrevious = () => {
    switch (currentPage) {
      case 'validationPage':
        return setCurrentPage('lunaticPage')
      case 'lunaticPage':
        return isFirstPage ? setCurrentPage('welcomePage') : goPrevLunatic()
      case 'endPage':
      case 'welcomePage':
        return
    }
    assert<Equals<typeof currentPage, never>>(false)
  }

  const goToPage = (
    params:
      | {
          page: StromaePage
        }
      | Parameters<LunaticGoToPage>[0]
  ) => {
    switch (params.page) {
      case 'validationPage':
      case 'endPage':
      case 'welcomePage':
        setCurrentPage(params.page)
        return
      default:
        // Lunatic page
        setCurrentPage('lunaticPage')
        goToLunaticPage(params)
    }
  }
  return { goNext, goPrevious, goToPage, currentPage }
}
