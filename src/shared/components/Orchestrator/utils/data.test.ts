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
  }
  expect(trimCollectedData(data)).toMatchObject({
    objectA: { COLLECTED: 'hello' },
    objectB: { COLLECTED: null },
    objectC: {
      COLLECTED: 'hello',
      EDITED: 'world',
      FORCED: 'how',
      INPUTTED: 'are',
      PREVIOUS: 'you',
    },
  })
})
