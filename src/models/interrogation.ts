import type { Extends } from 'tsafe/Extends'
import { assert } from 'tsafe/assert'

import type { Interrogation as ApiInterrogation } from './api'
import type { InterrogationData } from './interrogationData'
import type { StateData } from './stateData'

export type Interrogation = {
  data?: InterrogationData
  id?: string
  personalization?: Array<{ name: string; value: string }>
  questionnaireId?: string
  stateData?: StateData
}

assert<Extends<Interrogation, ApiInterrogation>>()
