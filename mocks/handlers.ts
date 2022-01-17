import { rest } from 'msw'
import lastFmMock from './__mocks__/lastFmMock.json'

export const handlers = [
  rest.get(`${process.env.LAST_FM_API_HOST}/2.0/`, (req, res, ctx) => {
    const method = req.url.searchParams.get('method')
    if (method === 'user.getRecentTracks') {
      return res(ctx.json(lastFmMock))
    } else {
      return res(ctx.json({}))
    }
  }),
]
