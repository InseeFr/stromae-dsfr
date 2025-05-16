import { act, renderHook } from '@testing-library/react'

import { PAGE_TYPE } from '@/constants/page'
import type { InternalPageType, PageType, StromaePage } from '@/models/Page'

import { useStromaeNavigation } from './useStromaeNavigation'

describe('Use stromae navigation', () => {
  test.each<{ initialCurrentPage?: PageType; expected: InternalPageType }>([
    { initialCurrentPage: PAGE_TYPE.WELCOME, expected: PAGE_TYPE.LUNATIC },
    { initialCurrentPage: PAGE_TYPE.VALIDATION, expected: PAGE_TYPE.LUNATIC },
    { initialCurrentPage: PAGE_TYPE.END, expected: PAGE_TYPE.END },
    { expected: PAGE_TYPE.LUNATIC },
  ])(
    'go to next $initialCurrentPage -> $expected',
    async ({ initialCurrentPage, expected }) => {
      const { result } = renderHook(() =>
        useStromaeNavigation({
          initialCurrentPage,
        }),
      )

      act(() => result.current.handleNextPage())

      expect(result.current.currentPage).toBe(expected)
    },
  )

  test('go to next lunaticPage -> lunaticPage (not last page)', () => {
    const goNextWithControlsMock = (goNext: () => void) => goNext()
    const goNextLunaticMock = vi.fn()

    const { result } = renderHook(() =>
      useStromaeNavigation({
        goNextWithControls: goNextWithControlsMock,
        goNextLunatic: goNextLunaticMock,
      }),
    )

    act(() => result.current.handleNextPage()) // go to lunatic page

    act(() => result.current.handleNextPage())

    expect(goNextLunaticMock).toHaveBeenCalledOnce()
    expect(result.current.currentPage).toBe(PAGE_TYPE.LUNATIC)
  })

  test('go to next lunaticPage -> validationPage (last page)', () => {
    const goNextWithControlsMock = (goNext: () => void) => goNext()
    const goNextLunaticMock = vi.fn()

    const { result } = renderHook(() =>
      useStromaeNavigation({
        isLastPage: true,
        goNextWithControls: goNextWithControlsMock,
        goNextLunatic: goNextLunaticMock,
      }),
    )

    act(() => result.current.handleNextPage()) // go to lunatic page

    act(() => result.current.handleNextPage())

    expect(goNextLunaticMock).not.toHaveBeenCalled()
    expect(result.current.currentPage).toBe(PAGE_TYPE.VALIDATION)
  })

  test.each<{ initialCurrentPage?: PageType; expected: InternalPageType }>([
    { initialCurrentPage: PAGE_TYPE.WELCOME, expected: PAGE_TYPE.WELCOME },
    { initialCurrentPage: PAGE_TYPE.VALIDATION, expected: PAGE_TYPE.WELCOME },
    { initialCurrentPage: PAGE_TYPE.END, expected: PAGE_TYPE.END },
    { expected: PAGE_TYPE.WELCOME },
  ])(
    'go to previous $initialCurrentPage -> $expected',
    async ({ initialCurrentPage, expected }) => {
      const { result } = renderHook(() =>
        useStromaeNavigation({
          initialCurrentPage,
        }),
      )

      act(() => result.current.handlePreviousPage())

      expect(result.current.currentPage).toBe(expected)
    },
  )

  test('go to previous lunaticPage -> lunaticPage (not first page)', () => {
    const goPrevLunaticMock = vi.fn()

    const { result } = renderHook(() =>
      useStromaeNavigation({
        goPrevLunatic: goPrevLunaticMock,
      }),
    )

    act(() => result.current.handleNextPage()) // go to lunatic page

    act(() => result.current.handlePreviousPage())

    expect(goPrevLunaticMock).toHaveBeenCalledOnce()
    expect(result.current.currentPage).toBe(PAGE_TYPE.LUNATIC)
  })

  test('go to next lunaticPage -> welcomePage (first page)', () => {
    const goPrevLunaticMock = vi.fn()

    const { result } = renderHook(() =>
      useStromaeNavigation({
        isFirstPage: true,
        goPrevLunatic: goPrevLunaticMock,
      }),
    )

    act(() => result.current.handleNextPage()) // go to lunatic page

    act(() => result.current.handlePreviousPage())

    expect(goPrevLunaticMock).not.toHaveBeenCalled()
    expect(result.current.currentPage).toBe(PAGE_TYPE.WELCOME)
  })

  test.each<{ page: StromaePage; shouldGoToLunaticPageBeCalled?: boolean }>([
    { page: PAGE_TYPE.WELCOME },
    { page: PAGE_TYPE.VALIDATION },
    { page: PAGE_TYPE.END },
  ])('go to page $page', ({ page }) => {
    const goToLunaticPageMock = vi.fn()

    const { result } = renderHook(() =>
      useStromaeNavigation({
        goToLunaticPage: goToLunaticPageMock,
      }),
    )

    act(() => result.current.handleGoToPage({ page }))
    expect(goToLunaticPageMock).not.toHaveBeenCalled()

    expect(result.current.currentPage).toBe(page)
  })

  test('go to lunatic page ', () => {
    const goToLunaticPageMock = vi.fn()

    const { result } = renderHook(() =>
      useStromaeNavigation({
        goToLunaticPage: goToLunaticPageMock,
      }),
    )

    act(() => result.current.handleGoToPage({ page: 1 }))

    expect(goToLunaticPageMock).toHaveBeenCalledOnce()
    expect(goToLunaticPageMock).toHaveBeenCalledWith({ page: 1 })

    expect(result.current.currentPage).toBe(PAGE_TYPE.LUNATIC)
  })
})
