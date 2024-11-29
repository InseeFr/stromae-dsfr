import { act, renderHook } from '@testing-library/react'

import { PAGE_TYPE } from '@/constants/page'
import type { InternalPageType, PageType } from '@/models/Page'

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

    act(() => result.current.goNext()) // go to lunatic page

    act(() => result.current.goNext())

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

    act(() => result.current.goNext()) // go to lunatic page

    act(() => result.current.goNext())

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

      act(() => result.current.goPrevious())

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

    act(() => result.current.goNext()) // go to lunatic page

    act(() => result.current.goPrevious())

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

    act(() => result.current.goNext()) // go to lunatic page

    act(() => result.current.goPrevious())

    expect(goPrevLunaticMock).not.toHaveBeenCalled()
    expect(result.current.currentPage).toBe(PAGE_TYPE.WELCOME)
  })
})
