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

  const sourceMultipleQuestion = {
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
      {
        componentType: 'Question',
        page: '3',
        id: 'q2',
        components: [
          {
            componentType: 'Input',
            page: '3',
            label: { value: 'my-question-2', type: 'TXT' },
            id: 'i2',
            response: { name: 'my-question-2-input' },
          },
        ],
      },
    ],
    variables: [],
    maxPage: '3',
  }
  const queryClient = new QueryClient()
  const OrchestratorTestWrapper = ({
    mode,
    isDownloadEnabled = false,
  }: {
    mode: MODE_TYPE.COLLECT | MODE_TYPE.REVIEW | MODE_TYPE.VISUALIZE
    isDownloadEnabled?: boolean
  }) => (
    <QueryClientProvider client={queryClient}>
      <Orchestrator
        metadata={metadata}
        mode={mode}
        isDownloadEnabled={isDownloadEnabled}
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
          isTelemetryEnabled: true,
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
          isTelemetryEnabled: true,
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
          isTelemetryEnabled: true,
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
          isTelemetryEnabled: true,
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
          isTelemetryEnabled: false,
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
          isTelemetryEnabled: true,
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
          isTelemetryEnabled: true,
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

  it('stays in dirty state when data update fails', async () => {
    const user = userEvent.setup()
    const updateDataAndStateData = vi
      .fn()
      .mockRejectedValue(new Error('Network error'))

    const { getByText } = renderWithRouter(
      <QueryClientProvider client={queryClient}>
        <Orchestrator
          metadata={metadata}
          mode={MODE_TYPE.COLLECT}
          isDownloadEnabled={false}
          initialInterrogation={interrogation}
          // @ts-expect-error: we should have a better lunatic mock
          source={sourceMultipleQuestion}
          getReferentiel={() => {
            return new Promise(() => [])
          }}
          updateDataAndStateData={updateDataAndStateData}
          getDepositProof={() => {
            return new Promise<void>(() => {})
          }}
        />
      </QueryClientProvider>,
    )

    await user.click(getByText('Start'))
    await user.click(getByText('Continue'))

    await user.click(getByText('my-question'))
    await user.keyboard('test-input')

    expect(document.title).toContain('*')

    await user.click(getByText('Continue'))

    await waitFor(() => {
      expect(updateDataAndStateData).toHaveBeenCalledTimes(1)
    })

    expect(updateDataAndStateData).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          'my-question-input': {
            COLLECTED: 'test-input',
          },
        }),
      }),
    )

    //Wait for the request to fail
    await waitFor(
      () => {
        expect(document.title).not.toBe('Sending the questionnaire')
        expect(document.title).toContain('*')
      },
      { timeout: 3000 },
    )
  })

  it('retains user input after failed save and successful retry', async () => {
    const user = userEvent.setup()
    let callCount = 0

    // First call fails, second call succeeds
    const updateDataAndStateData = vi.fn().mockImplementation(() => {
      callCount++
      if (callCount === 1) {
        return Promise.reject(new Error('Network error'))
      }
      return Promise.resolve()
    })

    const { getByText } = renderWithRouter(
      <QueryClientProvider client={queryClient}>
        <Orchestrator
          metadata={metadata}
          mode={MODE_TYPE.COLLECT}
          isDownloadEnabled={false}
          initialInterrogation={interrogation}
          // @ts-expect-error: we should have a better lunatic mock
          source={sourceMultipleQuestion}
          getReferentiel={() => {
            return new Promise(() => [])
          }}
          updateDataAndStateData={updateDataAndStateData}
          getDepositProof={() => {
            return new Promise<void>(() => {})
          }}
        />
      </QueryClientProvider>,
    )

    await user.click(getByText('Start'))
    await user.click(getByText('Continue'))

    await user.click(getByText('my-question'))
    await user.keyboard('Maelle ending >>')

    await user.click(getByText('Continue'))

    await waitFor(() => {
      expect(updateDataAndStateData).toHaveBeenCalledTimes(1)
    })

    await user.click(getByText('my-question-2'))
    await user.keyboard('Esquie goes weeeee')

    act(() => getByText('Continue').click())

    await waitFor(() => {
      expect(updateDataAndStateData).toHaveBeenCalledTimes(2)
    })

    expect(updateDataAndStateData).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          'my-question-2-input': {
            COLLECTED: 'Esquie goes weeeee',
          },
          'my-question-input': {
            COLLECTED: 'Maelle ending >>',
          },
        }),
      }),
    )

    await waitFor(() => {
      expect(document.title).not.toContain('*')
    })
  })

  it('does not send duplicate data when both requests succeed with a timeout', async () => {
    const user = userEvent.setup()
    let callCount = 0

    const updateDataAndStateData = vi.fn().mockImplementation(() => {
      callCount++
      if (callCount === 1) {
        return new Promise((resolve) => {
          setTimeout(() => resolve(undefined), 1500)
        })
      }
      if (callCount === 2) {
        return new Promise((resolve) => {
          setTimeout(() => resolve(undefined), 500)
        })
      }
      return Promise.resolve()
    })

    const { getByText } = renderWithRouter(
      <QueryClientProvider client={queryClient}>
        <Orchestrator
          metadata={metadata}
          mode={MODE_TYPE.COLLECT}
          isDownloadEnabled={false}
          initialInterrogation={interrogation}
          // @ts-expect-error: we should have a better lunatic mock
          source={sourceMultipleQuestion}
          getReferentiel={() => {
            return new Promise(() => [])
          }}
          updateDataAndStateData={updateDataAndStateData}
          getDepositProof={() => {
            return new Promise<void>(() => {})
          }}
        />
      </QueryClientProvider>,
    )

    await user.click(getByText('Start'))
    await user.click(getByText('Continue'))

    await user.click(getByText('my-question'))
    await user.keyboard('Maelle ending >>')

    await user.click(getByText('Continue'))

    // Trigger second save before first completes
    await new Promise((resolve) => setTimeout(resolve, 500))

    await user.click(getByText('my-question-2'))
    await user.keyboard('Esquie goes weeeee')

    await user.click(getByText('Continue'))

    await waitFor(
      () => {
        expect(updateDataAndStateData).toHaveBeenCalledTimes(2)
      },
      { timeout: 3000 },
    )

    const calls = updateDataAndStateData.mock.calls

    expect(calls[0][0]).toEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          'my-question-input': {
            COLLECTED: 'Maelle ending >>',
          },
        }),
      }),
    )

    expect(calls[1][0]).toEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          'my-question-input': {
            COLLECTED: 'Maelle ending >>',
          },
          'my-question-2-input': {
            COLLECTED: 'Esquie goes weeeee',
          },
        }),
      }),
    )

    const secondCallData = calls[1][0].data
    const firstCallData = calls[0][0].data

    expect(secondCallData).toHaveProperty('my-question-2-input')
    expect(firstCallData).not.toHaveProperty('my-question-2-input')

    await waitFor(
      () => {
        expect(document.title).not.toContain('*')
      },
      { timeout: 3000 },
    )
  })

  it('retains data when multiple requests are made before first timeout completes', async () => {
    const user = userEvent.setup()
    let callCount = 0

    const updateDataAndStateData = vi.fn().mockImplementation(() => {
      callCount++
      if (callCount === 1) {
        // First call fails after 2s
        return new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Network timeout')), 2000)
        })
      }
      if (callCount === 2) {
        // Second call succeeds immediately
        return Promise.resolve()
      }
      return Promise.resolve()
    })

    const { getByText } = renderWithRouter(
      <QueryClientProvider client={queryClient}>
        <Orchestrator
          metadata={metadata}
          mode={MODE_TYPE.COLLECT}
          isDownloadEnabled={false}
          initialInterrogation={interrogation}
          // @ts-expect-error: we should have a better lunatic mock
          source={sourceMultipleQuestion}
          getReferentiel={() => {
            return new Promise(() => [])
          }}
          updateDataAndStateData={updateDataAndStateData}
          getDepositProof={() => {
            return new Promise<void>(() => {})
          }}
        />
      </QueryClientProvider>,
    )

    await user.click(getByText('Start'))
    await user.click(getByText('Continue'))

    await user.click(getByText('my-question'))
    await user.keyboard('Maelle ending >>')

    await user.click(getByText('Continue'))

    await waitFor(() => {
      expect(updateDataAndStateData).toHaveBeenCalledTimes(1)
    })

    await user.click(getByText('my-question-2'))
    await user.keyboard('Esquie goes weeeee')

    // Save before the first request times out
    await user.click(getByText('Continue'))

    // We ensure that both requests were made
    await waitFor(
      () => {
        expect(updateDataAndStateData).toHaveBeenCalledTimes(2)
      },
      { timeout: 3000 },
    )

    expect(updateDataAndStateData).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          'my-question-input': {
            COLLECTED: 'Maelle ending >>',
          },
          'my-question-2-input': {
            COLLECTED: 'Esquie goes weeeee',
          },
        }),
      }),
    )

    // As the second request succeeded, we should not be in a dirty state
    await waitFor(
      () => {
        expect(document.title).not.toContain('*')
      },
      { timeout: 5000 },
    )
  })
})
