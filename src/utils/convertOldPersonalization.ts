import type { SurveyUnitMetadata } from '@/model/api'
import type { Content, Metadata } from '@/model/Metadata'

const keysToExtract = ['whoAnswers1', 'whoAnswers2', 'whoAnswers3']

export function convertContent(
  personalization: SurveyUnitMetadata['personalization']
): Content | undefined {
  const textItems = personalization
    ?.filter((item) => keysToExtract.includes(item.name) && item.value !== '')
    .map((item) => item.value)

  if (textItems === undefined) return undefined
  return {
    type: 'list',
    textItems,
  }
}

/**
 *
 * @param personalization
 * Temporary function before the api move to new Schema described here @url https://github.com/InseeFr/stromae-dsfr/issues/81#issuecomment-2216825059
 */
export function convertOldPersonalization(
  personalization: SurveyUnitMetadata['personalization']
): Metadata['surveyUnitInfo'] {
  const contentBlock = convertContent(personalization)

  if (contentBlock === undefined) return undefined
  return [
    {
      title: 'Qui doit répondre à ce questionnaire ?',
      contentBlocks: [contentBlock],
    },
  ]
}
