import type { Extends } from 'tsafe/Extends'
import { assert } from 'tsafe/assert'

import type { StateData } from './StateData'
import type { SurveyUnitData } from './SurveyUnitData'
import type { SurveyUnit as ApiSurveyUnit } from './api'

export type SurveyUnit = {
  data?: SurveyUnitData
  id?: string
  personalization?: Array<{ name: string; value: string }>
  questionnaireId?: string
  stateData?: StateData
}

assert<Extends<SurveyUnit, ApiSurveyUnit>>()
