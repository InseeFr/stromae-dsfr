import type { ReactNode } from 'react'

import { AxiosError } from 'axios'
import i18n from 'i18next'

import { ZodErrorWithName } from './ZodErrorWithName'
import { NotFoundError } from './notFoundError'

type ErrorNormalized = {
  title: string
  subtitle: string
  paragraph: string | ReactNode
  code?: number
}

export function errorNormalizer(error: unknown): ErrorNormalized {
  const t = i18n.t

  if (error instanceof NotFoundError) {
    return {
      title: t('error.notFound.title'),
      subtitle: t('error.notFound.subtitle'),
      paragraph: t('error.notFound.paragraph'),
      code: 404,
    }
  }

  if (error instanceof AxiosError) {
    if (!error.response) {
      return {
        title: t('error.connectionError.title'),
        subtitle: t('error.connectionError.subtitle'),
        paragraph: t('error.connectionError.paragraph'),
      }
    }
    const status = error.response.status
    switch (status) {
      case 404:
        return {
          title: t('error.resourceNotFound.title'),
          subtitle: t('error.resourceNotFound.subtitle'),
          paragraph: t('error.resourceNotFound.paragraph'),
          code: status,
        }
      case 401:
        return {
          title: t('error.unauthorized.title'),
          subtitle: t('error.unauthorized.subtitle'),
          paragraph: t('error.unauthorized.paragraph'),
          code: status,
        }
      case 403:
        return {
          title: t('error.forbidden.title'),
          subtitle: t('error.forbidden.subtitle'),
          paragraph: t('error.forbidden.paragraph'),
          code: status,
        }
      case 400:
        return {
          title: t('error.badRequest.title'),
          subtitle: t('error.badRequest.subtitle'),
          paragraph: t('error.badRequest.paragraph'),
          code: status,
        }
      case 500:
        return {
          title: t('error.serverError.title'),
          subtitle: t('error.serverError.subtitle'),
          paragraph: t('error.serverError.paragraph'),
          code: status,
        }
      default:
        return {
          title: t('error.unhandledError.title'),
          subtitle: t('error.unhandledError.subtitle'),
          paragraph: t('error.unhandledError.paragraph'),
          code: status,
        }
    }
  }

  if (error instanceof ZodErrorWithName) {
    return {
      title: t('error.validationError.title'),
      subtitle: t('error.validationError.subtitle', { name: error.name }),
      paragraph: (
        <ul>
          {error.errors.map((e, index) => (
            <li key={index}>
              {e.path.join('.')} : {e.message}
            </li>
          ))}
        </ul>
      ),
    }
  }
  return {
    title: t('error.unknownError.title'),
    subtitle: t('error.unknownError.subtitle'),
    paragraph: t('error.unknownError.paragraph'),
  }
}
