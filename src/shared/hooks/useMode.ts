import type { MODE_TYPE } from '@/consts/mode'

export function useMode():
  | MODE_TYPE.COLLECT
  | MODE_TYPE.REVIEW
  | MODE_TYPE.VISUALIZE
  | undefined {
  return undefined
}
