import { useId } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import type { LunaticSlotComponents } from '@inseefr/lunatic'
import { useStyles } from 'tss-react'

export const MarkdownLink: LunaticSlotComponents['MarkdownLink'] = (props) => {
  const { href, children, tooltip } = props

  const id = useId()
  const { css } = useStyles()

  return (
    <>
      {href !== '.' ? (
        <a
          {...(href !== '#'
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          id={id}
          href={href}
          aria-describedby={tooltip ? `tooltip-${id}` : undefined}
        >
          {children}
        </a>
      ) : (
        <span
          id={id}
          tabIndex={0}
          aria-describedby={tooltip ? `tooltip-${id}` : undefined}
          className={css({
            color: fr.colors.decisions.text.default.info.default,
            textDecoration: 'underline',
            textDecorationColor: fr.colors.decisions.text.default.info.default,
            textDecorationStyle: 'dotted',
            textDecorationThickness: 'var(--underline-thickness)',
            textUnderlineOffset: '0.3rem',
            cursor: 'help',
            ':after': {
              content: '" 🛈"',
              fontWeight: 'initial',
            },
          })}
        >
          {children}
        </span>
      )}
      {tooltip && (
        <span
          className={fr.cx('fr-tooltip', 'fr-placement')}
          id={`tooltip-${id}`}
          role="tooltip"
        >
          {tooltip}
        </span>
      )}
    </>
  )
}
