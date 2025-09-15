import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

import { MODE_TYPE } from '@/constants/mode'
import { TELEMETRY_EVENT_TYPE } from '@/constants/telemetry'
import { TelemetryContext } from '@/contexts/TelemetryContext'
import { renderWithRouter } from '@/utils/tests'

import { Orchestrator } from './Orchestrator'

describe('Orchestrator', () => {
  const interrogation = {
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
  const OrchestratorTestWrapper = ({
    mode,
  }: {
    mode: MODE_TYPE.COLLECT | MODE_TYPE.REVIEW | MODE_TYPE.VISUALIZE
  }) => (
    <QueryClientProvider client={queryClient}>
      <Orchestrator
        metadata={metadata}
        mode={mode}
        initialInterrogation={interrogation}
        // @ts-expect-error: we should have a better lunatic mock
        source={source}
        getReferentiel={() => {
          return new Promise(() => [])
        }}
        updateDataAndStateData={() => {
          return new Promise<void>(() => {})
        }}
        getDepositProof={() => {
          return new Promise<void>(() => {})
        }}
      />
    </QueryClientProvider>
  )

  it('sets idInterrogation as default value', async () => {
    const setDefaultValues = vi.fn()

    renderWithRouter(
      <TelemetryContext.Provider
        value={{
          isTelemetryDisabled: false,
          pushEvent: () => {},
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
          isTelemetryDisabled: false,
          pushEvent,
          setDefaultValues: () => {},
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
          isTelemetryDisabled: false,
          pushEvent,
          setDefaultValues: () => {},
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
          isTelemetryDisabled: false,
          pushEvent,
          setDefaultValues: () => {},
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
          isTelemetryDisabled: true,
          pushEvent,
          setDefaultValues: () => {},
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
          isTelemetryDisabled: false,
          pushEvent,
          setDefaultValues: () => {},
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
          isTelemetryDisabled: false,
          pushEvent,
          setDefaultValues: () => {},
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
})
