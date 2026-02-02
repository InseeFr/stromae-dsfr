import { expect } from 'vitest'

import { renderWithi18n } from '@/utils/tests'

import { EndPage } from './EndPage'

describe('EndPage', () => {
  it('displays date at which answers have been sent', async () => {
    const date = 1728289634098
    const formattedDate = new Date(date).toLocaleString()

    const { getByText } = renderWithi18n(<EndPage date={date} />)

    expect(
      getByText(`Your responses were sent on ${formattedDate}.`),
    ).toBeInTheDocument()
  })

  it('displays no date if no date has been provided', async () => {
    const { getByText } = renderWithi18n(<EndPage />)

    expect(getByText(`Your responses were sent.`)).toBeInTheDocument()
  })

  it('does not display date if data have been flagged for extraction', async () => {
    const date = 1728289634098
    const formattedDate = { formattedDate: undefined }

    const { getByText, queryByText } = renderWithi18n(
      <EndPage date={date} state={'TOEXTRACT'} />,
    )

    expect(getByText(`Your responses were sent.`)).toBeInTheDocument()

    expect(queryByText(`${formattedDate}`)).not.toBeInTheDocument()
  })

  it('does not display date if data have been extracted', async () => {
    const date = 1728289634098
    const formattedDate = { formattedDate: undefined }

    const { getByText, queryByText } = renderWithi18n(
      <EndPage date={date} state={'EXTRACTED'} />,
    )

    expect(getByText(`Your responses were sent.`)).toBeInTheDocument()

    expect(
      queryByText(`${JSON.stringify(formattedDate)}`),
    ).not.toBeInTheDocument()
  })
})
