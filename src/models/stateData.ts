import { type Extends } from 'tsafe/Extends'
import { assert } from 'tsafe/assert'

import type { StateData as StateDataApi } from './api'
import type { PageType } from './page'

export type StateData = {
  state: 'INIT' | 'COMPLETED' | 'VALIDATED' | 'TOEXTRACT' | 'EXTRACTED'
  date: number
  currentPage: PageType
}

assert<Extends<StateData, StateDataApi>>()
