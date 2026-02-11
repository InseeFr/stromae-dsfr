import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import ArtWorkBackground from '@codegouvfr/react-dsfr/dsfr/artwork/background/ovoid.svg'
import TechnicalError from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/technical-error.svg'
import ArtWork from '@codegouvfr/react-dsfr/dsfr/artwork/system.svg'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { errorNormalizer } from '@/components/error/errorNormalizer'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

type Props = {
  error: unknown
  reset?: () => void
  redirectTo: 'home' | 'portal' | 'visualizeForm' | undefined
}

const REDIRECT_KEY_MAP = {
  home: 'error.redirectHome',
  portal: 'error.redirectPortal',
  visualizeForm: 'error.redirectVisualizeForm',
} as const satisfies Record<NonNullable<Props['redirectTo']>, string>

export function ErrorComponent(props: Props) {
  const { error, redirectTo, reset } = props
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { title, subtitle, paragraph, code } = errorNormalizer(error)

  useDocumentTitle(title)

  const redirectKey = redirectTo ? REDIRECT_KEY_MAP[redirectTo] : ''

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
                      href: `${import.meta.env.VITE_PORTAIL_URL}${import.meta.env.VITE_EXIT_PATH}`,
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
              {t(redirectKey)}
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
