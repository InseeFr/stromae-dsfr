import { type Extends } from 'tsafe/Extends'
import { assert } from 'tsafe/assert'

import type { PageType } from './Page'
import type { QuestionnaireState } from './QuestionnaireState'
import type { StateData as StateDataApi } from './api'

export type StateData = {
  state: QuestionnaireState
  date: number
  currentPage: PageType
}

assert<Extends<StateData, StateDataApi>>()
