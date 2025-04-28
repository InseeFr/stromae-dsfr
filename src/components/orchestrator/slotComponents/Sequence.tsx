import { useId } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import type { LunaticSlotComponents } from '@inseefr/lunatic'

import { useSequenceTitle } from '@/hooks/useDocumentTitle'

import { Declarations } from './Declarations'

export const Sequence: LunaticSlotComponents['Sequence'] = (props) => {
  const { label, declarations, description } = props

  const id = useId()

  useSequenceTitle(props.label)

  return (
    <div
      id={id}
      className={fr.cx('fr-p-4w', 'fr-mb-2w')}
      style={{
        backgroundColor: fr.colors.decisions.background.alt.grey.default,
      }}
    >
      <h2>{label}</h2>
      {description && <p>{description}</p>}
      <Declarations
        type="AFTER_QUESTION_TEXT"
        declarations={declarations}
        id={id}
      />
    </div>
  )
}
