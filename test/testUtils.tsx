/* eslint-disable jest/require-top-level-describe */
import React, { FunctionComponent, ReactElement } from 'react'
import { render, RenderResult } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import lastFmMock from './__mocks__/lastFmMock.json'
import { AppLayout } from '../src/layouts/AppLayout'

global.fetch = require('node-fetch')

const server = setupServer(
  rest.get(
    'https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=exiguus_&api_key=98a2e5544a139a5675d1a85b8126f0f7&limit=1&nowplaying=true&format=json',
    (req, res, ctx) => {
      return res(ctx.json(lastFmMock))
    }
  )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

interface ProviderProps {
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

const customRender = (ui: any, options = {}): RenderResult =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
