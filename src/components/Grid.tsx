import { type PropsWithChildren } from 'react'

import { fr } from '@codegouvfr/react-dsfr'

export function Grid(props: PropsWithChildren) {
  const { children } = props
  return (
    <div className={fr.cx('fr-grid-row', 'fr-grid-row--center', 'fr-my-10v')}>
      <div className={fr.cx('fr-col-lg-6', 'fr-col-md-9', 'fr-col-12')}>
        {children}
      </div>
    </div>
  )
}
