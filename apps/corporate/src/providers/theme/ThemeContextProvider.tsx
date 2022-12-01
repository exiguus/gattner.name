import React, { FunctionComponent, useMemo, useReducer } from 'react'
import { darkTheme, lightTheme } from '../../styles/theme'
import { ThemeProvider } from 'styled-components'
import { prev, current, updateTheme } from './lib'
import { ThemeContext, ThemeContextProps } from './ThemeContext'

export const ThemeContextProvider: FunctionComponent = ({ children }) => {
  const [{ timestamp, darkMode }, setDarkMode] = useReducer(prev, current())

  // Create context value
  const value: ThemeContextProps = useMemo(
    () => ({
      theme: updateTheme(darkMode ? darkTheme : lightTheme, darkMode),
      darkMode,
      setDarkMode,
    }),
    [darkMode]
  )
  console.log({ darkMode, timestamp })
  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={value.theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
