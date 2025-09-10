import { useQueryClient } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Orchestrator } from '@/components/orchestrator/Orchestrator'

import { ReviewPage } from './ReviewPage'
import { reviewRoute } from './route'

vi.mock('@tanstack/react-query', async () => {
  const original = await vi.importActual('@tanstack/react-query')
  return {
    ...original,
    useQueryClient: vi.fn(),
  }
})

vi.mock('./route', () => ({
  reviewRoute: {
    useLoaderData: vi.fn(),
  },
}))

vi.mock('@/components/orchestrator/Orchestrator', () => ({
  Orchestrator: vi.fn(() => null),
}))

vi.mock('@/api/04-nomenclatures', () => ({
  getGetNomenclatureByIdQueryOptions: vi.fn(),
}))

describe('ReviewPage', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render Orchestrator with props when loader results are present', () => {
    const mockLoaderResults = {
      source: { id: 'sourceId' },
      interrogation: { id: 'int1', name: 'Interrogation 1' },
      metadata: { label: 'metadataLabel' },
    }
    vi.mocked(reviewRoute.useLoaderData).mockReturnValue(mockLoaderResults)

    const queryClient = {
      ensureQueryData: vi.fn(),
    }
    vi.mocked(useQueryClient).mockReturnValue(queryClient as any)

    render(<ReviewPage />)

    expect(Orchestrator).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'review',
        metadata: mockLoaderResults.metadata,
        source: mockLoaderResults.source,
        initialInterrogation: mockLoaderResults.interrogation,
        getReferentiel: expect.any(Function),
      }),
      {},
    )
  })

  it('should handle error when ensureQueryData fails', async () => {
    const mockLoaderResults = {
      source: { id: 'sourceId' },
      interrogationData: { id: 'int1', name: 'Interrogation 1' },
      metadata: { label: 'metadataLabel' },
    }
    vi.mocked(reviewRoute.useLoaderData).mockReturnValue(mockLoaderResults)

    const queryClient = {
      ensureQueryData: vi.fn().mockRejectedValue(new Error('Query failed')),
    }
    vi.mocked(useQueryClient).mockReturnValue(queryClient as any)

    render(<ReviewPage />)

    const orchestratorProps = vi.mocked(Orchestrator).mock.calls[0][0] as {
      getReferentiel: (name: string) => Promise<any>
    }

    await expect(
      orchestratorProps.getReferentiel('nomenclatureName'),
    ).rejects.toThrow('Query failed')
  })
})
