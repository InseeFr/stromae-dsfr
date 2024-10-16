import { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  createRouter,
} from '@tanstack/react-router'

export const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({})

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      networkMode: 'always',
    },
  },
})

export const router = createRouter({
  routeTree: rootRoute,
  context: {
    queryClient,
  },
})
