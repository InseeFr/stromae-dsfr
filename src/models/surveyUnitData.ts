import type { LunaticData } from '@inseefr/lunatic'
import type { Extends } from 'tsafe/Extends'
import { assert } from 'tsafe/assert'

import type { SurveyUnit } from './api'
import type { StateData } from './stateData'

export type SurveyUnitData = {
  data?: LunaticData
  id?: string
  personalization?: Array<{ name: string; value: string }>
  stateData?: StateData
}

assert<Extends<SurveyUnitData, SurveyUnit>>()
