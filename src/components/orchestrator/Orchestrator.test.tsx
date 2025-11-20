import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

import { MODE_TYPE } from '@/constants/mode'
import { PAGE_TYPE } from '@/constants/page'
import { TELEMETRY_EVENT_TYPE } from '@/constants/telemetry'
import { TelemetryContext } from '@/contexts/TelemetryContext'
import type { Interrogation } from '@/models/interrogation'
import { renderWithRouter } from '@/utils/tests'

import { Orchestrator } from './Orchestrator'

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    (await importOriginal()) as typeof import('@tanstack/react-router')
  return {
    ...actual,
    useSearch: vi.fn(),
  }
})

describe('Orchestrator', () => {
  const defaultInterrogation = {
    stateData: undefined,
    data: undefined,
    personalization: undefined,
    id: 'my-service-unit-id',
  }
  const metadata = {
    label: 'my label',
    objectives: 'my objectives',
    mainLogo: { label: 'logo label', url: '' },
  }
  const source = {
    componentType: 'Questionnaire',
    components: [
      {
        componentType: 'Sequence',
        page: '1',
        id: 's1',
        label: [{ type: 'VTL', value: '"Ma séquence"' }],
      },
      {
        componentType: 'Question',
        page: '2',
        id: 'q1',
        components: [
          {
            componentType: 'Input',
            page: '2',
            label: { value: 'my-question', type: 'TXT' },
            id: 'i1',
            response: { name: 'my-question-input' },
          },
        ],
      },
    ],
    variables: [],
    maxPage: '2',
  }
  const queryClient = new QueryClient()

  const mockGetDepositProof = vi.fn()

  const OrchestratorTestWrapper = ({
    mode,
    isDownloadEnabled = false,
    initialInterrogation = defaultInterrogation,
  }: {
    mode: MODE_TYPE.COLLECT | MODE_TYPE.REVIEW | MODE_TYPE.VISUALIZE
    isDownloadEnabled?: boolean
    initialInterrogation?: Interrogation
  }) => (
    <QueryClientProvider client={queryClient}>
      <Orchestrator
        metadata={metadata}
        mode={mode}
        isDownloadEnabled={isDownloadEnabled}
        initialInterrogation={initialInterrogation}
        // @ts-expect-error: we should have a better lunatic mock
        source={source}
        getReferentiel={() => {
          return new Promise(() => [])
        }}
        updateDataAndStateData={() => {
          return new Promise<void>(() => { })
        }}
        getDepositProof={mockGetDepositProof}
      />
    </QueryClientProvider>
  )

  it('sets idInterrogation as default value', async () => {
    const setDefaultValues = vi.fn()

    renderWithRouter(
      <TelemetryContext.Provider
        value={{
          isTelemetryEnabled: true,
          pushEvent: () => { },
          setDefaultValues,
        }}
      >
        <OrchestratorTestWrapper mode={MODE_TYPE.COLLECT} />
      </TelemetryContext.Provider>,
    )

    await waitFor(() => expect(setDefaultValues).toHaveBeenCalledOnce())
    await waitFor(() =>
      expect(setDefaultValues).toHaveBeenCalledWith({
        idInterrogation: 'my-service-unit-id',
      }),
    )
  })

  it('triggers telemetry init event', async () => {
    const pushEvent = vi.fn()

    renderWithRouter(
      <TelemetryContext.Provider
        value={{
          isTelemetryEnabled: true,
          pushEvent,
          setDefaultValues: () => { },
        }}
      >
        <OrchestratorTestWrapper mode={MODE_TYPE.COLLECT} />
      </TelemetryContext.Provider>,
    )

    await waitFor(() => expect(pushEvent).toHaveBeenCalledOnce())
    await waitFor(() =>
      expect(pushEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: TELEMETRY_EVENT_TYPE.INIT,
        }),
      ),
    )
  })

  it('does not trigger telemetry event in visualize mode', async () => {
    const pushEvent = vi.fn()

    const { getByText } = renderWithRouter(
      <TelemetryContext.Provider
        value={{
          isTelemetryEnabled: true,
          pushEvent,
          setDefaultValues: () => { },
        }}
      >
        <OrchestratorTestWrapper mode={MODE_TYPE.VISUALIZE} />
      </TelemetryContext.Provider>,
    )

    await waitFor(() => expect(pushEvent).not.toHaveBeenCalled())
    act(() => getByText('Start').click())
    await waitFor(() => expect(pushEvent).not.toHaveBeenCalled())
  })

  it('does not trigger telemetry event in review mode', async () => {
    const pushEvent = vi.fn()

    const { getByText } = renderWithRouter(
      <TelemetryContext.Provider
        value={{
          isTelemetryEnabled: true,
          pushEvent,
          setDefaultValues: () => { },
        }}
      >
        <OrchestratorTestWrapper mode={MODE_TYPE.REVIEW} />
      </TelemetryContext.Provider>,
    )

    await waitFor(() => expect(pushEvent).not.toHaveBeenCalled())
    act(() => getByText('Start').click())
    await waitFor(() => expect(pushEvent).not.toHaveBeenCalled())
  })

  it('does not trigger telemetry event if disabled', async () => {
    const pushEvent = vi.fn()

    const { getByText } = renderWithRouter(
      <TelemetryContext.Provider
        value={{
          isTelemetryEnabled: false,
          pushEvent,
          setDefaultValues: () => { },
        }}
      >
        <OrchestratorTestWrapper mode={MODE_TYPE.COLLECT} />
      </TelemetryContext.Provider>,
    )

    await waitFor(() => expect(pushEvent).not.toHaveBeenCalled())
    act(() => getByText('Start').click())
    await waitFor(() => expect(pushEvent).not.toHaveBeenCalled())
  })

  it('triggers telemetry next page event', async () => {
    const pushEvent = vi.fn()

    const { getByText } = renderWithRouter(
      <TelemetryContext.Provider
        value={{
          isTelemetryEnabled: true,
          pushEvent,
          setDefaultValues: () => { },
        }}
      >
        <OrchestratorTestWrapper mode={MODE_TYPE.COLLECT} />
      </TelemetryContext.Provider>,
    )

    act(() => getByText('Start').click())

    await waitFor(() => expect(pushEvent).toHaveBeenCalledTimes(2))
    expect(pushEvent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: TELEMETRY_EVENT_TYPE.NEW_PAGE,
      }),
    )
  })

  it('triggers telemetry input event', async () => {
    const pushEvent = vi.fn()
    const user = userEvent.setup()

    const { getByText } = renderWithRouter(
      <TelemetryContext.Provider
        value={{
          isTelemetryEnabled: true,
          pushEvent,
          setDefaultValues: () => { },
        }}
      >
        <OrchestratorTestWrapper mode={MODE_TYPE.COLLECT} />
      </TelemetryContext.Provider>,
    )

    act(() => getByText('Start').click())
    act(() => getByText('Continue').click())

    const e = getByText('my-question')
    await user.click(e)
    await user.keyboard('f')

    await new Promise((r) => setTimeout(r, 1000))
    await waitFor(() => expect(pushEvent).toHaveBeenCalledTimes(4))
    expect(pushEvent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: TELEMETRY_EVENT_TYPE.INPUT,
      }),
    )
  })

  it('enters dirty state on user input', async () => {
    const user = userEvent.setup()

    const { getByText } = renderWithRouter(
      <OrchestratorTestWrapper mode={MODE_TYPE.COLLECT} />,
    )

    act(() => getByText('Start').click())
    act(() => getByText('Continue').click())
    expect(document.title).not.toContain('*')

    const e = getByText('my-question')
    await user.click(e)
    await user.keyboard('f')
    expect(document.title).toContain('*')

    act(() => getByText('Continue').click())
    expect(document.title).not.toContain('*')
  })

  it('shows download button when enabled', async () => {
    const user = userEvent.setup()
    const { getByText } = renderWithRouter(
      <OrchestratorTestWrapper
        mode={MODE_TYPE.COLLECT}
        isDownloadEnabled={true}
      />,
    )

    act(() => getByText('Start').click())
    act(() => getByText('Continue').click())

    const e = getByText('my-question')

    await user.click(e)
    await user.keyboard('f')

    act(() => getByText('Continue').click())

    expect(getByText('Download data')).toBeInTheDocument()
  })

  it('always shows download button in visualize mode', async () => {
    const user = userEvent.setup()
    const { getByText } = renderWithRouter(
      <OrchestratorTestWrapper mode={MODE_TYPE.VISUALIZE} />,
    )

    act(() => getByText('Start').click())
    act(() => getByText('Continue').click())

    const e = getByText('my-question')

    await user.click(e)
    await user.keyboard('f')

    act(() => getByText('Continue').click())

    expect(getByText('Download data')).toBeInTheDocument()
  })

  it('hides download button when disabled', async () => {
    const { getByText, queryByText } = renderWithRouter(
      <OrchestratorTestWrapper mode={MODE_TYPE.COLLECT} />,
    )
    act(() => getByText('Start').click())
    expect(queryByText('Download data')).toBeNull()
  })

  it('calls getDepositProof with right params', async () => {
    // Set initial interrogation as validated on end page to directly enable download receipt
    const initialInterrogation: Interrogation = {
      ...defaultInterrogation,
      stateData: { state: 'VALIDATED', currentPage: PAGE_TYPE.END, date: 1 },
    }

    // Provide encoded param via URL
    vi.mocked(useSearch).mockReturnValue({
      surveyUnitCompositeName: 'RnJhbsOnYWlz',
    })

    const { getByText } = renderWithRouter(
      <OrchestratorTestWrapper
        mode={MODE_TYPE.COLLECT}
        initialInterrogation={initialInterrogation}
      />,
    )

    vi.mocked(mockGetDepositProof).mockResolvedValue(undefined)

    // download deposit proof
    act(() => getByText('Download the receipt').click())

    expect(mockGetDepositProof).toHaveBeenCalledWith({
      surveyUnitCompositeName: 'RnJhbsOnYWlz',
    })
  })
})