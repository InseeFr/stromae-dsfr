import { fr } from '@codegouvfr/react-dsfr'
import { type PropsWithChildren } from 'react'

export function Grid(props: PropsWithChildren) {
  const { children } = props
  return (
    <div className={fr.cx('fr-grid-row', 'fr-grid-row--center')}>
      <div className={fr.cx('fr-col-lg-6', 'fr-col-md-9', 'fr-col-12')}>
        {children}
      </div>
    </div>
  )
}
