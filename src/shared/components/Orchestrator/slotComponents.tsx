/* eslint-disable react-refresh/only-export-components */
import type { LunaticSlotComponents } from '@inseefr/lunatic'
import { slotComponents as dsfrSlotsComponents } from '@inseefr/lunatic-dsfr'
import { useEffect, useRef, type ComponentProps } from 'react'
import { useSequenceTitle } from 'shared/hooks/useDocumentTitle'
import { assert } from 'tsafe/assert'

const DsfrSequence = dsfrSlotsComponents['Sequence']

const Sequence: LunaticSlotComponents['Sequence'] = (props) => {
  assert(DsfrSequence !== undefined)

  useSequenceTitle(props.label)

  return <DsfrSequence {...props} />
}

const DsfrComponentWrapper = dsfrSlotsComponents['ComponentWrapper']

const ComponentWrapper: LunaticSlotComponents['ComponentWrapper'] = (props) => {
  const ref = useRef<HTMLDivElement & { __component__: ComponentObject }>(null)
  console.log(props)
  assert(DsfrComponentWrapper !== undefined)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    ref.current.__component__ = getComponentObject(props)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="component-wrapper" ref={ref}>
      <DsfrComponentWrapper {...props} />
    </div>
  )
}

export type ComponentObject = {
  iteration: number | undefined
  responses: string[]
}

function getComponentObject(
  props: ComponentProps<LunaticSlotComponents['ComponentWrapper']>
) {
  return {
    iteration: 'iteration' in props ? props.iteration : undefined,
    responses:
      'response' in props
        ? [props.response.name]
        : 'responses' in props && Array.isArray(props.responses)
          ? props.responses.map((r) => r.name as string)
          : [],
  } satisfies ComponentObject
}

export const slotComponents = {
  ...dsfrSlotsComponents,
  Sequence,
  ComponentWrapper,
}
