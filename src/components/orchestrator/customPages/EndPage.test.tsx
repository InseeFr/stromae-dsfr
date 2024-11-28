import { render } from '@testing-library/react'
import { expect } from 'vitest'
import { EndPage } from './EndPage'

describe('EndPage', () => {
  it('displays date at which answers have been sent', async () => {
    const date = 1728289634098

    const { getByText } = render(<EndPage date={date} />)

    expect(
      getByText(
        `Your responses were sent on ${new Date(date).toLocaleString()}.`,
      ),
    ).toBeInTheDocument()
  })

  it('displays no date if no date has been provided', async () => {
    const { getByText } = render(<EndPage />)

    expect(getByText('Your responses were sent.')).toBeInTheDocument()
  })

  it('does not display date if data have been flagged for extraction', async () => {
    const date = 1728289634098

    const { getByText, queryByText } = render(
      <EndPage date={date} state={'TOEXTRACT'} />,
    )

    expect(getByText('Your responses were sent.')).toBeInTheDocument()
    expect(queryByText(`${new Date(date).toLocaleString()}`)).toBeNull()
  })

  it('does not display date if data have been extracted', async () => {
    const date = 1728289634098

    const { getByText, queryByText } = render(
      <EndPage date={date} state={'EXTRACTED'} />,
    )

    expect(getByText('Your responses were sent.')).toBeInTheDocument()
    expect(queryByText(`${new Date(date).toLocaleString()}`)).toBeNull()
  })
})
