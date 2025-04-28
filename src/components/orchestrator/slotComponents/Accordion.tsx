import { fr } from '@codegouvfr/react-dsfr'
import { Accordion as DSFRAccordion } from '@codegouvfr/react-dsfr/Accordion'
import type { LunaticSlotComponents } from '@inseefr/lunatic'

export const Accordion: LunaticSlotComponents['Accordion'] = (props) => {
  const { items } = props
  return (
    <div className={fr.cx('fr-accordions-group')}>
      {items.map(
        (item, k) =>
          item.body && (
            <DSFRAccordion key={k} label={item.label}>
              {item.body}
            </DSFRAccordion>
          ),
      )}
    </div>
  )
}
