import { render } from '@testing-library/react'
import { expect } from 'vitest'

import { ValidationModal } from './ValidationModal'
import { WelcomeModal } from './WelcomeModal'

describe('WelcomeModal', () => {
  it('Buttons of Welcome Modal should have data-testid', async () => {
    const goBackMock = vi.fn()

    const backToSartDataTestId = 'back-to-start-button-welcome-modal'
    const continueDataTestId = 'continue-button-welcome-modal'

    const { getByTestId } = render(
      <WelcomeModal goBack={goBackMock} open={true} />,
    )

    expect(getByTestId(backToSartDataTestId)).toBeInTheDocument()

    expect(getByTestId(backToSartDataTestId).getAttribute('data-testid')).toBe(
      backToSartDataTestId,
    )

    expect(getByTestId(continueDataTestId)).toBeInTheDocument()
    expect(getByTestId(continueDataTestId).getAttribute('data-testid')).toBe(
      continueDataTestId,
    )
  })
})

describe('ValidationModal', () => {
  it('Buttons of Validation Modal should have data-testid', async () => {
    const mockRef = { current: { open: vi.fn() } }

    const cancelDataTestId = 'cancel-button-validation-modal'
    const validateDataTestId = 'validate-button-validation-modal'

    const { getByTestId } = render(<ValidationModal actionsRef={mockRef} />)

    expect(getByTestId(cancelDataTestId)).toBeInTheDocument()

    expect(getByTestId(cancelDataTestId).getAttribute('data-testid')).toBe(
      cancelDataTestId,
    )

    expect(getByTestId(validateDataTestId)).toBeInTheDocument()
    expect(getByTestId(validateDataTestId).getAttribute('data-testid')).toBe(
      validateDataTestId,
    )
  })
})
