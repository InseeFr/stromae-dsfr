import { fr } from '@codegouvfr/react-dsfr'
import ArtWorkBackground from '@codegouvfr/react-dsfr/dsfr/artwork/background/ovoid.svg'
import TechnicalErrorDsfr from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/technical-error.svg'
import ArtWork from '@codegouvfr/react-dsfr/dsfr/artwork/system.svg'
import { useIsGov } from '@codegouvfr/react-dsfr/mui'

import computerErrorSvgUrl from './computer-error.svg'

export function TechnicalError() {
  const { isGov } = useIsGov()

  if (!isGov) {
    return (
      <img
        alt="technical-error"
        aria-hidden="true"
        src={computerErrorSvgUrl}
        width="160"
        height="200"
      />
    )
  }
  return (
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
          xlinkHref={`${TechnicalErrorDsfr}#artwork-decorative`}
        ></use>
        <use
          className={fr.cx('fr-artwork-minor')}
          xlinkHref={`${TechnicalErrorDsfr}#artwork-minor`}
        ></use>
        <use
          className={fr.cx('fr-artwork-major')}
          xlinkHref={`${TechnicalErrorDsfr}#artwork-major`}
        ></use>
      </g>
    </svg>
  )
}
