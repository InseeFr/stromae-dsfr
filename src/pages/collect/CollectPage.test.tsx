import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Orchestrator } from '@/components/orchestrator/Orchestrator'

import { CollectPage } from './CollectPage'
import { collectRoute } from './route'

vi.mock('@tanstack/react-query', async () => {
  const original = await vi.importActual('@tanstack/react-query')
  return {
    ...original,
    useQueryClient: vi.fn(),
  }
})

vi.mock('@/components/Toast', () => ({
  showToast: vi.fn(),
}))

vi.mock('@/components/orchestrator/Orchestrator', () => ({
  Orchestrator: vi.fn(),
}))

vi.mock('./route', () => ({
  collectRoute: {
    useLoaderData: vi.fn(),
    useParams: vi.fn(() => ({ surveyUnitId: 'test-id' })),
  },
}))

describe('CollectPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render Orchestrator with props ', () => {
    const mockCollectData = {
      source: { id: 'sourceId' },
      surveyUnit: { id: 'su1', name: 'Survey Unit 1' },
      metadata: { label: 'metadataLabel' },
    }
    vi.mocked(collectRoute.useLoaderData).mockReturnValue(mockCollectData)

    render(<CollectPage />)

    expect(Orchestrator).toHaveBeenCalledWith(
      expect.objectContaining({
        source: mockCollectData.source,
        surveyUnit: mockCollectData.surveyUnit,
        metadata: mockCollectData.metadata,
        getReferentiel: expect.any(Function),
        updateDataAndStateData: expect.any(Function),
        getDepositProof: expect.any(Function),
      }),
      {},
    )
  })
})
