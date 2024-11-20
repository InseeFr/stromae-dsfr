import { render } from '@testing-library/react'
import { expect } from 'vitest'

import { EndPage } from './EndPage'

vi.mock('i18nifty')

describe('EndPage', () => {
  it('displays date at which answers have been sent', async () => {
    const date = 1728289634098
    const formattedDate = { formattedDate: new Date(date).toLocaleString() }

    const { getByText } = render(<EndPage date={date} />)

    expect(
      getByText(`paragraph ${JSON.stringify(formattedDate)}`),
    ).toBeInTheDocument()
  })

  it('displays no date if no date has been provided', async () => {
    const formattedDate = { formattedDate: undefined }

    const { getByText } = render(<EndPage />)

    expect(
      getByText(`paragraph ${JSON.stringify(formattedDate)}`),
    ).toBeInTheDocument()
  })

  it('does not display date if data have been flagged for extraction', async () => {
    const date = 1728289634098
    const formattedDate = { formattedDate: undefined }

    const { getByText, queryByText } = render(
      <EndPage date={date} state={'TOEXTRACT'} />,
    )

    expect(
      getByText(`paragraph ${JSON.stringify(formattedDate)}`),
    ).toBeInTheDocument()
    expect(queryByText(`${new Date(date).toLocaleString()}`)).toBeNull()
  })

  it('does not display date if data have been extracted', async () => {
    const date = 1728289634098
    const formattedDate = { formattedDate: undefined }

    const { getByText, queryByText } = render(
      <EndPage date={date} state={'EXTRACTED'} />,
    )

    expect(
      getByText(`paragraph ${JSON.stringify(formattedDate)}`),
    ).toBeInTheDocument()
    expect(queryByText(`${new Date(date).toLocaleString()}`)).toBeNull()
  })
})
