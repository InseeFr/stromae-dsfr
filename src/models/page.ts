import type { LunaticState } from '@inseefr/lunatic'

import { PAGE_TYPE } from '@/constants/page'

export type StromaePage =
  | PAGE_TYPE.WELCOME
  | PAGE_TYPE.VALIDATION
  | PAGE_TYPE.END

export type PageType = StromaePage | LunaticState['pageTag']

export type InternalPageType = StromaePage | PAGE_TYPE.LUNATIC
