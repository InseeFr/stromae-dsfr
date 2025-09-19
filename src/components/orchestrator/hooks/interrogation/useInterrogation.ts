import { useState } from 'react'

import type { getArticulationState, useLunatic } from '@inseefr/lunatic'

import { PAGE_TYPE } from '@/constants/page'
import type { Interrogation } from '@/models/interrogation'
import type { InterrogationData } from '@/models/interrogationData'
import type { PageType } from '@/models/page'
import type { QuestionnaireState } from '@/models/questionnaireState'
import type { StateData } from '@/models/stateData'
import { hasMultimode } from '@/utils/env.ts'

import { computeUpdatedData, hasDataChanged } from './utils'

type Params = {
  getMultimode: ReturnType<typeof useLunatic>['getMultimode']
  getArticulationState: () => ReturnType<typeof getArticulationState>
}

const defaultParams: Params = {
  getMultimode: () => ({ IS_MOVED: false }),
  getArticulationState: () => ({ items: [] }),
}

const emptyData: InterrogationData = {}

export function useInterrogation(
  initialInterrogation: Interrogation,
  { getMultimode, getArticulationState }: Params = defaultParams,
) {
  const [interrogation, setInterrogation] = useState(initialInterrogation)

  /** Compute new state and send an update if necessary. */
  function getNewInterrogationState(
    hasDataChanged: boolean,
    currentPage: PageType,
  ): QuestionnaireState | undefined {
    // if there was no state and data has changed, initialize the state (INIT)
    if (!interrogation?.stateData?.state && hasDataChanged) {
      return 'INIT'
    }

    // on the end page, update state to VALIDATED
    if (currentPage === PAGE_TYPE.END) {
      return 'VALIDATED'
    }

    return interrogation.stateData?.state
  }

  /**
   * Update the interrogation when data or state changes and return the new interrogation
   */
  function updateInterrogation(
    changedData: InterrogationData,
    currentPage: PageType,
  ): Interrogation {
    const hasDataBeenUpdated = hasDataChanged(changedData)
    const data = computeUpdatedData(
      interrogation.data ?? emptyData,
      changedData,
    )
    const newState = getNewInterrogationState(hasDataBeenUpdated, currentPage)
    const result = {
      ...initialInterrogation,
      data,
    }
    const previousStateData = interrogation.stateData
    if (newState) {
      result.stateData = {
        state: newState,
        date: new Date().getTime(),
        currentPage: currentPage ?? PAGE_TYPE.WELCOME,
      }
      if (hasMultimode()) {
        const multimode = computeMultimodeStateData(getMultimode())
        result.stateData = {
          ...result.stateData,
          // Update the multimode if the state changed, otherwise keep the previous one
          multimode:
            multimode?.state !== previousStateData?.multimode?.state
              ? multimode
              : previousStateData?.multimode,
          leafStates: computeLeafStates(
            getArticulationState(),
            interrogation.stateData?.leafStates,
          ),
        }
      }
    }
    setInterrogation(result)
    return result
  }

  return {
    interrogation,
    updateInterrogation,
  }
}

/**
 * Convert a multimode received into a payload for stateData.
 * For now, we only check the first multimode key that is true.
 *
 * ## Input
 *
 * ```
 * {
 *  "IS_MOVED": true,
 *  "IS_SPLIT": false
 * }
 * ```
 *
 * ## Output
 *
 * {
 *    state: "IS_MOVED"
 *    date: 123123
 * }
 */
export function computeMultimodeStateData(
  multimode: ReturnType<ReturnType<typeof useLunatic>['getMultimode']>,
): Required<Interrogation>['stateData']['multimode'] | undefined {
  for (const [key, value] of Object.entries(multimode)) {
    // Multimode changed value
    if (value) {
      return {
        // @ts-expect-error we know the key should be is_moved or is_split
        state: key,
        date: new Date().getTime(),
      }
    }
  }
  return undefined
}

/**
 * Convert an articulation into leafStates
 */
export function computeLeafStates(
  articulation: ReturnType<typeof getArticulationState>,
  currentLeaves?: StateData['leafStates'],
): Required<Interrogation>['stateData']['leafStates'] {
  // Compute the new leaves
  const progressToState = (progress: number): 'INIT' | 'COMPLETED' | null => {
    switch (progress) {
      case 0:
        return 'INIT'
      case 1:
        return 'COMPLETED'
    }
    return null
  }
  // Compare each leaf to the previous one, if state changes, update the date
  return articulation.items.map((item, k) => {
    const state = progressToState(item.progress)
    if (!currentLeaves || state !== currentLeaves[k]?.state) {
      return {
        state,
        date: new Date().getTime(),
      }
    }
    return currentLeaves[k]
  })
}
