import { useState } from 'react'

import { PAGE_TYPE } from '@/constants/page'
import type { Interrogation } from '@/models/interrogation'
import type { InterrogationData } from '@/models/interrogationData'
import type { PageType } from '@/models/page'
import type { QuestionnaireState } from '@/models/questionnaireState'

import { computeUpdatedData, hasDataChanged } from './utils'

export function useInterrogation(initialInterrogation: Interrogation) {
  const [interrogationData, setInterrogationData] = useState<InterrogationData>(
    initialInterrogation.data ?? {},
  )
  const [interrogationState, setInterrogationState] = useState<
    QuestionnaireState | undefined
  >(initialInterrogation.stateData?.state ?? undefined)

  /** Compute new state and send an update if necessary. */
  function updateState(
    hasDataChanged: boolean,
    currentPage: PageType,
  ): QuestionnaireState | undefined {
    // if there was no state and data has changed, initialize the state (INIT)
    if (!interrogationState && hasDataChanged) {
      const newState = 'INIT'
      setInterrogationState(newState)
      return newState
    }

    // on the end page, update state to VALIDATED
    if (currentPage === PAGE_TYPE.END) {
      const newState = 'VALIDATED'
      setInterrogationState(newState)
      return newState
    }

    // state does not changed
    return interrogationState
  }

  /**
   * Compute new interrogation, and send a state update if the state (`"INIT"`,
   * `"COMPLETED"`...) has changed.
   */
  function updateInterrogation(
    changedData: InterrogationData,
    currentPage: PageType,
  ): Interrogation {
    const hasDataBeenUpdated = hasDataChanged(changedData)
    let newData
    if (hasDataBeenUpdated) {
      newData = computeUpdatedData(interrogationData, changedData)
      setInterrogationData(newData)
    }

    const newState = updateState(hasDataBeenUpdated, currentPage)

    return {
      ...initialInterrogation,
      data: hasDataBeenUpdated && newData ? newData : interrogationData,
      // provide stateData only if there is state (exclude null state)
      ...(newState && {
        stateData: {
          state: newState,
          date: new Date().getTime(),
          currentPage: currentPage ?? PAGE_TYPE.WELCOME,
        },
      }),
    }
  }

  return {
    interrogationData,
    updateInterrogation,
  }
}
