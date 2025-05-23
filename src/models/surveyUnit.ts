import type { Extends } from 'tsafe/Extends'
import { assert } from 'tsafe/assert'

import type { SurveyUnit as ApiSurveyUnit } from './api'
import type { StateData } from './stateData'
import type { SurveyUnitData } from './surveyUnitData'

export type SurveyUnit = {
  data?: SurveyUnitData
  id?: string
  personalization?: Array<{ name: string; value: string }>
  questionnaireId?: string
  stateData?: StateData
}

assert<Extends<SurveyUnit, ApiSurveyUnit>>()
