import type { LunaticData } from '@inseefr/lunatic'
import type { Extends } from 'tsafe/Extends'
import { assert } from 'tsafe/assert'
import type { StateData } from './StateData'
import type { SurveyUnit } from './api'

export type SurveyUnitData = SurveyUnit & {
  stateData?: StateData
  data?: LunaticData
  personalization?: Array<{ name: string; value: string }>
}

assert<Extends<SurveyUnitData, SurveyUnit>>()
