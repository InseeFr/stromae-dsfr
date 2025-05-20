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

      act(() => result.current.goNext())

      expect(result.current.currentPageType).toBe(expected)
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

    act(() => result.current.goNext()) // go to lunatic page

    act(() => result.current.goNext())

    expect(goNextLunaticMock).toHaveBeenCalledOnce()
    expect(result.current.currentPageType).toBe(PAGE_TYPE.LUNATIC)
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

    act(() => result.current.goNext()) // go to lunatic page

    act(() => result.current.goNext())

    expect(goNextLunaticMock).not.toHaveBeenCalled()
    expect(result.current.currentPageType).toBe(PAGE_TYPE.VALIDATION)
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

      act(() => result.current.goPrevious())

      expect(result.current.currentPageType).toBe(expected)
    },
  )

  test('go to previous lunaticPage -> lunaticPage (not first page)', () => {
    const goPrevLunaticMock = vi.fn()

    const { result } = renderHook(() =>
      useStromaeNavigation({
        goPrevLunatic: goPrevLunaticMock,
      }),
    )

    act(() => result.current.goNext()) // go to lunatic page

    act(() => result.current.goPrevious())

    expect(goPrevLunaticMock).toHaveBeenCalledOnce()
    expect(result.current.currentPageType).toBe(PAGE_TYPE.LUNATIC)
  })

  test('go to next lunaticPage -> welcomePage (first page)', () => {
    const goPrevLunaticMock = vi.fn()

    const { result } = renderHook(() =>
      useStromaeNavigation({
        isFirstPage: true,
        goPrevLunatic: goPrevLunaticMock,
      }),
    )

    act(() => result.current.goNext()) // go to lunatic page

    act(() => result.current.goPrevious())

    expect(goPrevLunaticMock).not.toHaveBeenCalled()
    expect(result.current.currentPageType).toBe(PAGE_TYPE.WELCOME)
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

    act(() => result.current.goToPage({ page }))
    expect(goToLunaticPageMock).not.toHaveBeenCalled()

    expect(result.current.currentPageType).toBe(page)
  })

  test('go to lunatic page ', () => {
    const goToLunaticPageMock = vi.fn()

    const { result } = renderHook(() =>
      useStromaeNavigation({
        goToLunaticPage: goToLunaticPageMock,
      }),
    )

    act(() => result.current.goToPage({ page: 1 }))

    expect(goToLunaticPageMock).toHaveBeenCalledOnce()
    expect(goToLunaticPageMock).toHaveBeenCalledWith({ page: 1 })

    expect(result.current.currentPageType).toBe(PAGE_TYPE.LUNATIC)
  })
})
