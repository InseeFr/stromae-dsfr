import { MODE_TYPE } from '@/constants/mode'
import { collectPath } from '@/pages/Collect/route'
import { reviewPath } from '@/pages/Review/route'
import { visualizePath } from '@/pages/Visualize/route'
import { useMatchRoute } from '@tanstack/react-router'

/** Returns current mode based on url */
export function useMode():
  | MODE_TYPE.COLLECT
  | MODE_TYPE.REVIEW
  | MODE_TYPE.VISUALIZE
  | undefined {
  const matchRoute = useMatchRoute()

  const isCollectRoute = !!matchRoute({ to: collectPath })
  if (isCollectRoute) return MODE_TYPE.COLLECT

  const isReviewPathRoute = !!matchRoute({ to: reviewPath })
  if (isReviewPathRoute) return MODE_TYPE.REVIEW

  const isVisualizeRoute = !!matchRoute({ to: visualizePath })
  if (isVisualizeRoute) return MODE_TYPE.VISUALIZE

  return undefined
}