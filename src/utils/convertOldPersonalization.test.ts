import { convertOldPersonalization } from './convertOldPersonalization'

test.each([
  [undefined, undefined],
  [[], undefined],
  [[{ name: 'invalid-key', value: 'Three-headed monkey' }], undefined],
  [
    [
      { name: 'whoAnswers1', value: 'Guybrush Threepwood' },
      { name: 'whoAnswers2', value: 'Three-headed monkey' },
    ],
    [
      {
        title: 'Qui doit répondre à ce questionnaire ?',
        contentBlocks: [
          {
            type: 'list',
            textItems: ['Guybrush Threepwood', 'Three-headed monkey'],
          },
        ],
      },
    ],
  ],
  [
    [
      { name: 'whoAnswers1', value: 'Guybrush Threepwood' },
      { name: 'invalid-key', value: 'Three-headed monkey' },
    ],
    [
      {
        title: 'Qui doit répondre à ce questionnaire ?',
        contentBlocks: [
          {
            type: 'list',
            textItems: ['Guybrush Threepwood'],
          },
        ],
      },
    ],
  ],
])('Convert old personalization', (input, res) => {
  expect(convertOldPersonalization(input)).toEqual(res)
})
