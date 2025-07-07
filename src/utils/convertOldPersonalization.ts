import type { InterrogationMetadata } from '@/models/api'
import type { Content, Metadata } from '@/models/metadata'

const keysToExtract = ['whoAnswers1', 'whoAnswers2', 'whoAnswers3']

function convertContent(
  personalization: InterrogationMetadata['personalization'],
): Content | undefined {
  const textItems = personalization
    ?.filter((item) => keysToExtract.includes(item.name) && item.value !== '')
    .map((item) => item.value)

  if (textItems === undefined || textItems.length === 0) return undefined
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
  personalization: InterrogationMetadata['personalization'],
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
