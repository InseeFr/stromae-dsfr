import { beforeEach, describe, expect, it, vi } from 'vitest'

import { focusLastInput } from './focusLastRowInput'

describe('focusLastInput', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    vi.clearAllMocks()
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  describe('table structure', () => {
    it('should focus on first input of last table row', () => {
      container.innerHTML = `
        <table>
          <tbody>
            <tr>
              <td><input id="input1" /></td>
              <td><input id="input2" /></td>
            </tr>
            <tr>
              <td><input id="input3" /></td>
              <td><input id="input4" /></td>
            </tr>
          </tbody>
        </table>
      `

      const input3 = container.querySelector('#input3') as HTMLInputElement
      const focusSpy = vi.spyOn(input3, 'focus')

      focusLastInput(container)

      expect(focusSpy).toHaveBeenCalled()
    })

    it('should handle table without tbody', () => {
      container.innerHTML = `
        <table>
          <tr>
            <td><input id="input1" /></td>
          </tr>
          <tr>
            <td><input id="input2" /></td>
          </tr>
        </table>
      `

      const input2 = container.querySelector('#input2') as HTMLInputElement
      const focusSpy = vi.spyOn(input2, 'focus')

      focusLastInput(container)

      expect(focusSpy).toHaveBeenCalled()
    })

    it('should handle empty table', () => {
      container.innerHTML = `<table></table>`
      const containerFocusSpy = vi.spyOn(container, 'focus')

      focusLastInput(container)

      expect(containerFocusSpy).toHaveBeenCalled()
    })

    it('should handle table row without inputs', () => {
      container.innerHTML = `
        <table>
          <tr><td>No input here</td></tr>
        </table>
      `
      const containerFocusSpy = vi.spyOn(container, 'focus')

      focusLastInput(container)

      expect(containerFocusSpy).toHaveBeenCalled()
    })
  })
  it('should focus on last input when no table present', () => {
    container.innerHTML = `
        <div>
          <input id="input1" />
          <input id="input2" />
          <input id="input3" />
        </div>
      `

    const input3 = container.querySelector('#input3') as HTMLInputElement
    const focusSpy = vi.spyOn(input3, 'focus')

    focusLastInput(container)

    expect(focusSpy).toHaveBeenCalled()
  })

  it('should focus on single input', () => {
    container.innerHTML = `<input id="input1" />`

    const input1 = container.querySelector('#input1') as HTMLInputElement
    const focusSpy = vi.spyOn(input1, 'focus')

    focusLastInput(container)

    expect(focusSpy).toHaveBeenCalled()
  })

  it('should focus on last div when no inputs available', () => {
    container.innerHTML = `
        <div>First div</div>
        <div id="lastDiv">Last div</div>
      `

    const lastDiv = container.querySelector('#lastDiv') as HTMLElement
    const focusSpy = vi.spyOn(lastDiv, 'focus')

    focusLastInput(container)

    expect(lastDiv.getAttribute('tabindex')).toBe('-1')
    expect(focusSpy).toHaveBeenCalled()
  })
})
