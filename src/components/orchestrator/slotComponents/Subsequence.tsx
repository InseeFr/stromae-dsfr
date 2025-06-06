import { useId } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import type { LunaticSlotComponents } from '@inseefr/lunatic'

import { Declarations } from './Declarations'

export const Subsequence: LunaticSlotComponents['Subsequence'] = (props) => {
  const { label, declarations, description } = props

  const id = useId()

  return (
    <div id={id} className={fr.cx('fr-mb-2w')}>
      <h3>{label}</h3>
      {description && <p>{description}</p>}
      <Declarations type="AFTER_QUESTION_TEXT" declarations={declarations} />
    </div>
  )
}
