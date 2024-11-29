import { isObjectEmpty } from './isObjectEmpty'

test.each([
  [{}, true],
  [{ a: '1' }, false],
  [undefined, true],
])('is object empty %o -> %o', (data, expected) => {
  expect(isObjectEmpty(data)).toBe(expected)
})
