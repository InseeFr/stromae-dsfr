import { trimCollectedData } from './data'

test('trim collected data works', () => {
  const data = {
    objectA: {
      COLLECTED: 'hello',
      EDITED: null,
      FORCED: null,
      INPUTTED: null,
      PREVIOUS: null,
    },
    objectB: {
      COLLECTED: null,
      EDITED: null,
      FORCED: null,
      INPUTTED: null,
      PREVIOUS: null,
    },
    objectC: {
      COLLECTED: 'hello',
      EDITED: 'world',
      FORCED: 'how',
      INPUTTED: 'are',
      PREVIOUS: 'you',
    },
    objectD: {
      COLLECTED: ['je', 'suis', 'un', 'tableau'],
      EDITED: null,
      FORCED: null,
      INPUTTED: null,
      PREVIOUS: null,
    },
  }
  expect(trimCollectedData(data)).toMatchObject({
    objectA: { COLLECTED: 'hello' },
    objectB: { COLLECTED: null },
    objectC: { COLLECTED: 'hello' },
    objectD: { COLLECTED: ['je', 'suis', 'un', 'tableau'] },
  })
})
