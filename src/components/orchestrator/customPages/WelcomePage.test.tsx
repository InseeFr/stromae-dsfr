import { render } from '@testing-library/react'
import { expect } from 'vitest'
import { WelcomePage } from './WelcomePage'

describe('WelcomePage', () => {
  it('displays metadata', async () => {
    const objectives = 'Vérifier que les composants React fonctionnent'
    const infoTitle = "Titre de l'information"
    const infoText = 'Une information'
    const surveyUnitInfoTitle = 'Qui doit répondre ?'
    const surveyUnitInfoText = 'Guybrush Threepwood'
    const { getByText } = render(
      <WelcomePage
        metadata={{
          label: 'Label de mon enquête',
          objectives,
          campaignInfo: [
            {
              title: infoTitle,
              contentBlocks: [
                {
                  type: 'paragraph',
                  textItems: [infoText],
                },
              ],
            },
          ],
          surveyUnitInfo: [
            {
              title: surveyUnitInfoTitle,
              contentBlocks: [
                {
                  type: 'list',
                  textItems: [surveyUnitInfoText],
                },
              ],
            },
          ],
          mainLogo: { label: '', url: '' },
          surveyUnitIdentifier: 'Id de la personne qui répond',
        }}
      />,
    )

    expect(getByText(objectives)).toBeInTheDocument()
    expect(getByText(infoTitle)).toBeInTheDocument()
    expect(getByText(infoText)).toBeInTheDocument()
    expect(getByText(surveyUnitInfoTitle)).toBeInTheDocument()
    expect(getByText(surveyUnitInfoText)).toBeInTheDocument()
  })
})
