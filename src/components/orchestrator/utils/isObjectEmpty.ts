export function isObjectEmpty(obj: Record<string, unknown>) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false
    }
  }
  return true
}
