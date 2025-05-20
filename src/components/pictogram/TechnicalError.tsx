import { fr } from '@codegouvfr/react-dsfr'
import ArtWorkBackground from '@codegouvfr/react-dsfr/dsfr/artwork/background/ovoid.svg'
import TechnicalErrorDsfr from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/technical-error.svg'
import '@codegouvfr/react-dsfr/dsfr/artwork/system.svg'
import artworkSystemSvgUrl from '@codegouvfr/react-dsfr/dsfr/artwork/system.svg'
import { useIsGov } from '@codegouvfr/react-dsfr/mui'
import { useStyles } from 'tss-react/mui'

export function TechnicalError() {
  const { isGov } = useIsGov()

  if (!isGov) {
    return <TechnicalErrorWhiteLabel />
  }

  return <TechnicalErrorGov />
}

function TechnicalErrorWhiteLabel() {
  const { theme } = useStyles()

  const strokeColor = theme.palette.text.primary

  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 32 32"
      enableBackground="new 0 0 32 32"
      id="Stock_cut"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M29,27H3   c-1.105,0-2-0.895-2-2V7c0-1.105,0.895-2,2-2h26c1.105,0,2,0.895,2,2v18C31,26.105,30.105,27,29,27z"
          fill="none"
          stroke={strokeColor}
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />

        <rect
          fill="none"
          height="4"
          stroke={strokeColor}
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          width="4"
          x="14"
          y="27"
        />

        <line
          fill="none"
          stroke={strokeColor}
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="31"
          x2="1"
          y1="23"
          y2="23"
        />

        <line
          fill="none"
          stroke={strokeColor}
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="9"
          x2="23"
          y1="31"
          y2="31"
        />

        <line
          fill="none"
          stroke={strokeColor}
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="16"
          x2="16"
          y1="8"
          y2="16"
        />

        <line
          fill="none"
          stroke={strokeColor}
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="16"
          x2="16"
          y1="18"
          y2="20"
        />
      </g>
    </svg>
  )
}

function TechnicalErrorGov() {
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
      <use href={`${artworkSystemSvgUrl}#artwork-motif`}></use>

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
