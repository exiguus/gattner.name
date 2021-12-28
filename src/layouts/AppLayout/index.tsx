import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from 'react'
import { ThemeProvider } from 'styled-components'
import { darkTheme, getRandomColor, lightTheme } from '../../styles/theme'
import { Theme } from '../../../types/Theme'
import { GlobalStyles } from '../../components/GlobalStyles'
import useMatchMedia from '../../hooks/useMatchMedia'

interface AppLayoutProps {
  children: ReactElement
}

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
  const [darkMode] = useState<boolean>(
    useMatchMedia('(prefers-color-scheme: dark)') ||
      document.querySelector('html')?.getAttribute('data-dark-mode') ===
        'true' ||
      false
  )
  const [theme, setTheme] = useState<Theme>(lightTheme)

  useEffect(() => {
    setTheme(darkMode ? darkTheme : lightTheme)

    const [backgroundHue, backgroundSaturation, backgroundAlpha] =
      getRandomColor()
    theme.application.backgroundColor = darkMode
      ? `hsl(${backgroundHue}, 90%, 5%, 0.8)`
      : `hsl(${backgroundHue}, ${backgroundSaturation}, ${backgroundAlpha}, 0.5)`
    theme.application.backgroundAnimationColor = darkMode
      ? `hsl(${backgroundHue}, 90%, 5%)`
      : `hsl(${backgroundHue}, ${backgroundSaturation}, ${backgroundAlpha})`
    theme.application.highlightColor = `hsl(${getRandomColor()}, ${
      darkMode ? 0.2 : 1
    })`
  }, [darkMode, theme])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export { AppLayout }
