import { fr } from '@codegouvfr/react-dsfr'
import { type PropsWithChildren } from 'react'

export function Container(props: PropsWithChildren) {
  const { children } = props
  return (
    <div className={fr.cx('fr-col-12', 'fr-my-10v', 'fr-container')}>
      {children}
    </div>
  )
}
