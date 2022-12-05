/* eslint-disable jest/require-top-level-describe */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FunctionComponent, ReactElement } from 'react'
import 'jest-styled-components'
import '@testing-library/jest-dom/extend-expect'
import '@gattner/types'
import { render, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, lightTheme } from '@gattner/ui-theme'
interface ProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any
}

const Providers: FunctionComponent<ProviderProps> = ({
  children,
}): ReactElement => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customRender = (ui: any, options = {}): RenderResult =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
