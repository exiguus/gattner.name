import { beforeAll, afterAll, afterEach } from '@jest/globals'

// eslint-disable-next-line @typescript-eslint/no-var-requires
/* eslint-disable jest/require-top-level-describe */
import { server } from '../mocks/server'

beforeAll(() => {
  return server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
