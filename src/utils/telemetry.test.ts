import {
  TELEMETRY_EVENT_EXIT_SOURCE,
  TELEMETRY_EVENT_TYPE,
} from '@/constants/telemetry'
import {
  areInputParadataIdentical,
  computeContactSupportEvent,
  computeControlEvent,
  computeControlSkipEvent,
  computeExitEvent,
  computeInitEvent,
  computeInputEvent,
  computeNewPageEvent,
} from './telemetry'

beforeAll(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(2024, 9, 28, 17, 7, 33, 11))
})

afterAll(() => {
  vi.useRealTimers()
})

describe('compute telemetry events', () => {
  test('for initialization', () => {
    expect(computeInitEvent()).toMatchObject({
      date: vi.getMockedSystemTime()?.toISOString(),
      type: TELEMETRY_EVENT_TYPE.INIT,
    })
  })

  test('for exit', () => {
    expect(
      computeExitEvent({ source: TELEMETRY_EVENT_EXIT_SOURCE.LOGOUT })
    ).toMatchObject({
      date: vi.getMockedSystemTime()?.toISOString(),
      source: 'logout',
      type: TELEMETRY_EVENT_TYPE.EXIT,
    })
  })

  test('for page change', () => {
    expect(
      computeNewPageEvent({
        page: 'my-new-page',
        pageTag: 'my-page-tag',
      })
    ).toMatchObject({
      date: vi.getMockedSystemTime()?.toISOString(),
      page: 'my-new-page',
      pageTag: 'my-page-tag',
      type: TELEMETRY_EVENT_TYPE.NEW_PAGE,
    })
  })

  test('for input', () => {
    expect(
      computeInputEvent({
        name: 'my-name',
        iteration: [1],
      })
    ).toMatchObject({
      date: vi.getMockedSystemTime()?.toISOString(),
      iteration: [1],
      name: 'my-name',
      type: TELEMETRY_EVENT_TYPE.INPUT,
    })
  })

  test('for control', () => {
    expect(
      computeControlEvent({ controlIds: ['my-control-1', 'my-control-2'] })
    ).toMatchObject({
      controlIds: ['my-control-1', 'my-control-2'],
      date: vi.getMockedSystemTime()?.toISOString(),
      type: TELEMETRY_EVENT_TYPE.CONTROL,
    })
  })

  test('for control skip', () => {
    expect(
      computeControlSkipEvent({ controlIds: ['my-control-1', 'my-control-2'] })
    ).toMatchObject({
      controlIds: ['my-control-1', 'my-control-2'],
      date: vi.getMockedSystemTime()?.toISOString(),
      type: TELEMETRY_EVENT_TYPE.CONTROL_SKIP,
    })
  })

  test('for contact support', () => {
    expect(computeContactSupportEvent()).toMatchObject({
      date: vi.getMockedSystemTime()?.toISOString(),
      type: TELEMETRY_EVENT_TYPE.CONTACT_SUPPORT,
    })
  })
})

test('correctly compares input paradata', async () => {
  expect(
    areInputParadataIdentical(
      computeInputEvent({ name: 'name' }),
      computeInputEvent({ name: 'name' })
    )
  ).toBeTruthy()
  expect(
    areInputParadataIdentical(
      computeInputEvent({ name: 'name1' }),
      computeInputEvent({ name: 'name2' })
    )
  ).toBeFalsy()
  expect(
    areInputParadataIdentical(
      computeInputEvent({ name: 'name', iteration: [1] }),
      computeInputEvent({ name: 'name', iteration: [1] })
    )
  ).toBeTruthy()
  expect(
    areInputParadataIdentical(
      computeInputEvent({ name: 'name1', iteration: [1] }),
      computeInputEvent({ name: 'name2', iteration: [1] })
    )
  ).toBeFalsy()
  expect(
    areInputParadataIdentical(
      computeInputEvent({ name: 'name', iteration: [1] }),
      computeInputEvent({ name: 'name', iteration: [2] })
    )
  ).toBeFalsy()
  expect(
    areInputParadataIdentical(
      computeInputEvent({
        name: 'name',
        iteration: undefined,
      }),
      computeInputEvent({ name: 'name', iteration: [1] })
    )
  ).toBeFalsy()
})
