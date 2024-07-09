import { fr } from '@codegouvfr/react-dsfr'

export const isMobileScreen = () =>
  window.matchMedia(fr.breakpoints.down('md').replace('@media ', '')).matches
