const useMock = [(k) => k, { changeLanguage: () => new Promise(() => {}) }]
useMock.t = (k, opts) => {
  if (!opts) {
    return k
  }
  return `${k} ${JSON.stringify(opts)}`
}
useMock.i18n = { changeLanguage: () => new Promise(() => {}) }

function createI18nApi() {
  return function () {
    const i18nApi = {
      useTranslation: () => useMock,
    }

    return i18nApi
  }
}

function declareComponentKeys() {
  return function () {
    return { i18n: () => {} }
  }
}

export { createI18nApi, declareComponentKeys }
