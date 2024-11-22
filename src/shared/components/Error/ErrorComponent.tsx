import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import ArtWorkBackground from '@codegouvfr/react-dsfr/dsfr/artwork/background/ovoid.svg'
import ArtWork from '@codegouvfr/react-dsfr/dsfr/artwork/system.svg'

import { declareComponentKeys, useTranslation } from '@/i18n'
import { Container } from '@/shared/components/Container'
import { errorNormalizer } from '@/shared/error/errorNormalizer'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import TechnicalError from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/technical-error.svg'
import { useNavigate, useSearch } from '@tanstack/react-router'

type Props = {
  error: unknown
  reset?: () => void
  redirectTo: 'home' | 'portal' | 'visualizeForm' | undefined
}

export function ErrorComponent(props: Props) {
  const { error, redirectTo, reset } = props
  const navigate = useNavigate()
  const { t } = useTranslation({ ErrorComponent })
  const { title, subtitle, paragraph, code } = errorNormalizer(error)

  useDocumentTitle(title)

  const search = useSearch({ strict: false })
  return (
    <Container>
      <div
        className={fr.cx(
          'fr-grid-row',
          'fr-grid-row--center',
          'fr-grid-row--middle',
        )}
      >
        <div className={fr.cx('fr-col-lg-6', 'fr-col-12')}>
          <h1>{title}</h1>
          {code && <span>Erreur {code}</span>}
          <p className={fr.cx('fr-mt-3w', 'fr-text--lead')}>{subtitle}</p>
          <p className={fr.cx('fr-mt-3w')}>{paragraph}</p>
          {redirectTo && (
            <Button
              size="large"
              linkProps={(() => {
                switch (redirectTo) {
                  case 'home':
                    return { to: '/' }
                  case 'portal':
                    return {
                      href: `${import.meta.env.VITE_PORTAIL_URL}${search?.['pathLogout'] ?? ''}`,
                    }
                  case 'visualizeForm':
                    return {
                      onClick: () => {
                        navigate({ to: '/visualize' }).then(reset)
                      },
                    }
                  default:
                    return {}
                }
              })()}
            >
              {t('error button redirect to', { redirectTo })}
            </Button>
          )}
        </div>
        <div
          className={fr.cx(
            'fr-col-lg-3',
            'fr-col-offset-lg-1',
            'fr-hidden',
            'fr-unhidden-lg',
          )}
        >
          <svg
            className={fr.cx('fr-artwork', 'fr-responsive-img')}
            aria-hidden="true"
            width="160"
            height="200"
            viewBox="0 0 160 200"
          >
            <use
              className={fr.cx('fr-artwork-motif')}
              href={`${ArtWorkBackground}#artwork-motif`}
            ></use>
            <use href={`${ArtWork}#artwork-motif`}></use>

            <use
              className={fr.cx('fr-artwork-background')}
              href={`${ArtWorkBackground}#artwork-background`}
            ></use>
            <g transform="translate(40, 60)">
              <use
                className={fr.cx('fr-artwork-decorative')}
                xlinkHref={`${TechnicalError}#artwork-decorative`}
              ></use>
              <use
                className={fr.cx('fr-artwork-minor')}
                xlinkHref={`${TechnicalError}#artwork-minor`}
              ></use>
              <use
                className={fr.cx('fr-artwork-major')}
                xlinkHref={`${TechnicalError}#artwork-major`}
              ></use>
            </g>
          </svg>
        </div>
      </div>
    </Container>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<{
  K: 'error button redirect to'
  P: { redirectTo: Props['redirectTo'] }
  R: string
}>()({ ErrorComponent })

export type I18n = typeof i18n
