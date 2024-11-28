import { type Extends } from 'tsafe/Extends'
import { assert } from 'tsafe/assert'
import type { PageType } from './Page'
import type { StateData as StateDataApi } from './api'

export type StateData = {
  state: 'INIT' | 'COMPLETED' | 'VALIDATED' | 'TOEXTRACT' | 'EXTRACTED'
  date: number
  currentPage: PageType
}

assert<Extends<StateData, StateDataApi>>()
