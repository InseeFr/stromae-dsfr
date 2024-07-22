import { type LunaticOptions, type LunaticState } from '@inseefr/lunatic'

export type LunaticGetReferentiel = LunaticOptions['getReferentiel']

export type Nomenclature = Awaited<
  ReturnType<NonNullable<LunaticGetReferentiel>>
>

export type LunaticGoToPage = LunaticState['goToPage']

export type LunaticGoPreviousPage = LunaticState['goPreviousPage']
export type LunaticGoNextPage = LunaticState['goNextPage']

export type LunaticOverview = LunaticState['overview']

export type LunaticPageTag = LunaticState['pageTag']

export type LunaticComponentsProps = ReturnType<LunaticState['getComponents']>

export type LunaticLogger = NonNullable<LunaticOptions['logger']>
