/* eslint-disable jest/require-top-level-describe */
import React, { FunctionComponent, ReactElement } from 'react'
import 'jest-styled-components'
import '@testing-library/jest-dom/extend-expect'
import { render, RenderResult } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { AppLayout } from '../src/layouts/AppLayout'
import lastFmMock from './__mocks__/lastFmMock.json'

import 'whatwg-fetch'

const server = setupServer(
  rest.get('https://ws.audioscrobbler.com/2.0/', (req, res, ctx) => {
    const method = req.url.searchParams.get('method')
    if (method === 'user.getRecentTracks') {
      return res(ctx.json(lastFmMock))
    } else {
      return res(ctx.json({}))
    }
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

interface ProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any
}

const Providers: FunctionComponent<ProviderProps> = ({
  children,
}): ReactElement => {
  return (
    <BrowserRouter>
      <AppLayout>{children}</AppLayout>
    </BrowserRouter>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customRender = (ui: any, options = {}): RenderResult =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
