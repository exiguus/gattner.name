import React, { FunctionComponent, useMemo, useReducer } from 'react'
import { darkTheme, lightTheme } from '@gattner/ui-theme'
import { ThemeProvider } from 'styled-components'
import { prev, current, updateTheme } from './lib'
import { ThemeContext, ThemeContextProps } from './ThemeContext'

export const ThemeContextProvider: FunctionComponent = ({ children }) => {
  const [{ darkMode }, setDarkMode] = useReducer(prev, current())

  // Create context value
  const value: ThemeContextProps = useMemo(
    () => ({
      theme: updateTheme(darkMode ? darkTheme : lightTheme, darkMode),
      darkMode,
      setDarkMode,
    }),
    [darkMode]
  )

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={value.theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
