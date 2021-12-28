import React, { FunctionComponent, ReactElement, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import theme, { getRandomColor } from '../../styles/theme'
import { GlobalStyles } from '../../components/GlobalStyles'
import { useLocation } from 'react-router-dom'

interface AppLayoutProps {
  children: ReactElement
}

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
  const location = useLocation()
  useEffect(() => {
    theme.application.highlightColor = getRandomColor()
  }, [location])
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export { AppLayout }
