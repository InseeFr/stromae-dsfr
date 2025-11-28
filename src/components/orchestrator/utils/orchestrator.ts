import { PAGE_TYPE } from '@/constants/page'
import type { Interrogation } from '@/models/api/interrogation'
import type { PageType } from '@/models/page'
import type { StateData } from '@/models/stateData'

import type { PendingData } from '../Orchestrator'

// Whether or not the form has been sent and cannot be updated anymore
export function hasBeenSent(state?: StateData['state']): boolean {
  return state !== undefined && state !== 'INIT'
}

// Display the welcome modal when the form has been begun
// and it's not been sent yet
export function shouldDisplayWelcomeModal(
  state?: StateData['state'],
  page?: PageType,
): boolean {
  return !hasBeenSent(state) && page !== PAGE_TYPE.WELCOME && page !== undefined
}

// Display the sync modal when the user has data to sync
export function shouldSyncData(
  interrogation?: Interrogation,
  pendingData?: PendingData,
): boolean {
  return (
    interrogation?.stateData?.currentPage === PAGE_TYPE.WELCOME &&
    pendingData?.stateData !== undefined
  )
}
