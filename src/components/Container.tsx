import { type PropsWithChildren } from 'react'

import { fr } from '@codegouvfr/react-dsfr'

export function Container(props: PropsWithChildren) {
  const { children } = props
  return (
    <div className={fr.cx('fr-col-12', 'fr-my-10v', 'fr-container')}>
      {children}
    </div>
  )
}
