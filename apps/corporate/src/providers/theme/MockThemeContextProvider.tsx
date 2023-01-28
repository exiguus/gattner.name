import React, { FunctionComponent } from 'react'
import { ThemeContext, ThemeContextProps, defaultProps } from '.'

export const MockThemeContextProvider: FunctionComponent<
  Partial<ThemeContextProps>
> = ({ children }) => (
  <ThemeContext.Provider
    value={{
      ...defaultProps,
    }}
  >
    {children}
  </ThemeContext.Provider>
)
