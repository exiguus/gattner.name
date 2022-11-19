/* eslint-disable jest/require-top-level-describe */
import React, { FunctionComponent, ReactElement } from 'react'
import 'jest-styled-components'
import '@testing-library/jest-dom/extend-expect'
import { render, RenderResult } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { server } from '../mocks/server'
import { AppLayout } from '../src/layouts/AppLayout'
import { SiteLayout } from '../src/layouts/SiteLayout'
import axios from 'axios'
import 'whatwg-fetch'

beforeAll(() => {
  // Permit CORS in Axios, see https://github.com/axios/axios/issues/1754#issuecomment-572778305
  axios.defaults.adapter = require('axios/lib/adapters/http')
  return server.listen()
})
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
      <AppLayout>
        <SiteLayout>{children}</SiteLayout>
      </AppLayout>
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
