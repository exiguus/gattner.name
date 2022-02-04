import { rest } from 'msw'
import lastFmMock from './__mocks__/lastFmMock.json'

const lastFmHandler = rest.get(
  `${process.env.LAST_FM_API_HOST}/2.0/`,
  (req, res, ctx) => {
    const method = req.url.searchParams.get('method')
    if (method === 'user.getRecentTracks') {
      return res(ctx.json(lastFmMock))
    } else {
      return res(ctx.json({}))
    }
  }
)

const sentryHandler = rest.get(`${process.env.SENTRY_DSN}`, (req, res, ctx) => {
  console.log('sentry dsn')
  return res(ctx.json({ message: 'Success' }))
})

export const handlers = [lastFmHandler, sentryHandler]

export const lastFmExceptionHandler = rest.get(
  `${process.env.LAST_FM_API_HOST}/2.0/`,
  (req, res, ctx) => {
    const method = req.url.searchParams.get('method')
    if (method === 'user.getRecentTracks') {
      return res(
        ctx.status(500),
        ctx.json({ message: 'Deliberately broken request' })
      )
    } else {
      return res(ctx.status(403), ctx.json({ message: 'Permission Denied' }))
    }
  }
)

export const handleException = [lastFmExceptionHandler]
