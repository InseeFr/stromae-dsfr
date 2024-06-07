import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import TechnicalError from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/technical-error.svg'
import { useNavigate } from '@tanstack/react-router'
import { Container } from 'shared/components/Container'
import { getErrorInformations } from 'shared/error/errorUtils'
import { useDocumentTitle } from 'shared/hooks/useDocumentTitle'

export function ErrorComponent(props: {
  error: unknown
  reset?: () => void
  redirectTo: 'home' | 'portal' | 'visualizeForm' | undefined
}) {
  const { error, redirectTo, reset } = props
  const navigate = useNavigate()
  const { title, subtitle, paragraph, code } = getErrorInformations(error)

  useDocumentTitle(title)

  return (
    <Container>
      <div
        className={fr.cx(
          'fr-grid-row',
          'fr-grid-row--center',
          'fr-grid-row--middle'
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
                    return { href: import.meta.env.VITE_PORTAIL_URL }
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
              {(() => {
                switch (redirectTo) {
                  case 'home':
                    return "Retourner à la page d'accueil"
                  case 'portal':
                    return 'Retourner sur le portail'
                  case 'visualizeForm':
                    return 'Retourner au formulaire de visualisation'
                }
              })()}
            </Button>
          )}
        </div>
        <div
          className={fr.cx(
            'fr-col-lg-3',
            'fr-col-offset-lg-1',
            'fr-col-8',
            'fr-mt-6w',
            'fr-col--middle'
          )}
        >
          <svg
            className={fr.cx('fr-artwork')}
            aria-hidden="true"
            viewBox="0 0 80 80"
            width="200"
            height="200"
          >
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
          </svg>
        </div>
      </div>
    </Container>
  )
}
