import { useQueryClient } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Orchestrator } from '@/components/orchestrator/Orchestrator'

import { VisualizePage } from './Visualize'
import { VisualizeForm } from './form/VisualizeForm'
import { visualizeRoute } from './route'

vi.mock('@tanstack/react-query', async () => {
  const original = await vi.importActual('@tanstack/react-query')
  return {
    ...original,
    useQueryClient: vi.fn(),
  }
})

vi.mock('./route', () => ({
  visualizeRoute: {
    useLoaderData: vi.fn(),
  },
}))

vi.mock('@/components/orchestrator/Orchestrator', () => ({
  Orchestrator: vi.fn(() => null),
}))

vi.mock('./form/VisualizeForm', () => ({
  VisualizeForm: vi.fn(),
}))

describe('VisualizePage', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render VisualizeForm when no loader results', () => {
    vi.mocked(visualizeRoute.useLoaderData).mockReturnValue(null)

    render(<VisualizePage />)

    expect(VisualizeForm).toHaveBeenCalled()
  })

  it('should render Orchestrator with props when loader results are present', () => {
    const mockLoaderResults = {
      source: { id: 'sourceId' },
      interrogation: { id: 'int1', name: 'Interrogation 1' },
      nomenclature: { name: 'nomenclatureName' },
      metadata: { label: 'metadataLabel' },
    }
    vi.mocked(visualizeRoute.useLoaderData).mockReturnValue(mockLoaderResults)

    const queryClient = {
      ensureQueryData: vi.fn(),
    }
    vi.mocked(useQueryClient).mockReturnValue(queryClient as any)

    render(<VisualizePage />)

    expect(Orchestrator).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'visualize',
        metadata: mockLoaderResults.metadata,
        source: mockLoaderResults.source,
        interrogation: mockLoaderResults.interrogation,
        getReferentiel: expect.any(Function),
      }),
      expect.anything(),
    )
  })

  it('should reject with error when nomenclature is not provided', async () => {
    const mockLoaderResults = {
      source: { id: 'sourceId' },
      interrogationData: { id: 'int1', name: 'Interrogation 1' },
      nomenclature: null,
      metadata: { label: 'metadataLabel' },
    }
    vi.mocked(visualizeRoute.useLoaderData).mockReturnValue(mockLoaderResults)

    const queryClient = {
      ensureQueryData: vi.fn(),
    }
    vi.mocked(useQueryClient).mockReturnValue(queryClient as any)

    render(<VisualizePage />)

    const orchestratorProps = vi.mocked(Orchestrator).mock.calls[0][0] as {
      getReferentiel: (name: string) => Promise<any>
    }

    expect(
      orchestratorProps.getReferentiel('nomenclatureName'),
    ).rejects.toThrow()
  })

  it('should reject with error when nomenclature name is not found', async () => {
    const mockLoaderResults = {
      source: { id: 'sourceId' },
      interrogationData: { id: 'int1', name: 'Interrogation 1' },
      nomenclature: { nomenclatureName: 'nomenclatureName' },
      metadata: { label: 'metadataLabel' },
    }
    vi.mocked(visualizeRoute.useLoaderData).mockReturnValue(mockLoaderResults)

    const queryClient = {
      ensureQueryData: vi.fn(),
    }
    vi.mocked(useQueryClient).mockReturnValue(queryClient as any)

    render(<VisualizePage />)
    const orchestratorProps = vi.mocked(Orchestrator).mock.calls[0][0] as {
      getReferentiel: (name: string) => Promise<any>
    }

    await expect(
      orchestratorProps.getReferentiel('unknownName'),
    ).rejects.toThrow('The nomenclature unknownName is not provided')
  })

  it('should call ensureQueryData when nomenclature name is found', async () => {
    const mockLoaderResults = {
      source: { id: 'sourceId' },
      interrogationData: { id: 'int1', name: 'Interrogation 1' },
      nomenclature: { nomenclatureName: 'someValue' },
      metadata: { label: 'metadataLabel' },
    }
    vi.mocked(visualizeRoute.useLoaderData).mockReturnValue(mockLoaderResults)

    const queryClient = {
      ensureQueryData: vi.fn(),
    }
    vi.mocked(useQueryClient).mockReturnValue(queryClient as any)

    render(<VisualizePage />)

    const orchestratorProps = vi.mocked(Orchestrator).mock.calls[0][0] as {
      getReferentiel: (name: string) => Promise<any>
    }

    await orchestratorProps.getReferentiel('nomenclatureName')

    expect(queryClient.ensureQueryData).toHaveBeenCalledWith(expect.any(Object))
  })
})
