import { Hono } from 'hono'
import { cors } from 'hono/cors'

// @ts-expect-error json are not typed
import source from './roundabout.json'

const app = new Hono()
const now = Math.round(Date.now() / 1000)
let stateData = { state: 'INIT', date: now }
let data = {}

app.use('/api/*', cors())

app.get('/api/questionnaire/:id/data', (c) => {
  return c.json(source)
})

app.get('/api/interrogations/:id/metadata', (c) => {
  return c.json({
    context: 'household',
    label: 'Ménage',
    objectives: 'recensement',
  })
})

app.get('/api/interrogations/:id', (c) => {
  return c.json({
    id: c.req.param('id'),
    questionnaireId: c.req.param('id'),
    data: {
      COLLECTED: data
    },
    stateData,
  })
})

app.patch('/api/interrogations/:id', async (c) => {
  const json = (await c.req.json()) as any
  data = {...data, ...json.data}
  stateData = json.stateData
  return c.json({})
})

app.post('/api/paradata', async (c) => {
  const json = (await c.req.json()) as any
  // console.log(json)
  return c.json({})
})

app.post('/api/events', async (c) => {
  const json = (await c.req.json()) as any
  console.log('event', json)
  return c.json({})
})

export default app
