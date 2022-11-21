import React, {
  FunctionComponent,
  ReactNode,
  useState,
  useReducer,
  useEffect,
} from 'react'
import { ThemeProvider } from 'styled-components'
import { darkTheme, getRandomColor, lightTheme } from '../../styles/theme'
import { Theme } from '../../../types/Theme'
import { GlobalStyles } from '../../components/GlobalStyles'
import Store from '@gattner/storage'
import { hasOwnProperty, isObject } from '@gattner/utils'

interface SiteLayoutProps {
  children: ReactNode
}

const store = new Store({
  item: { name: '__gattner__darkMode', type: 'localStorage' },
})

type StoreItem = { timestamp: number; darkMode: boolean }

const storeItem = {
  darkMode:
    document.querySelector('html')?.getAttribute('data-dark-mode') === 'true',
  timestamp: Date.now(),
}

const isStoreItem = (item: unknown): item is StoreItem =>
  isObject(item) &&
  hasOwnProperty(item, 'timestamp') &&
  typeof item.timestamp === 'number' &&
  hasOwnProperty(item, 'darkMode') &&
  typeof item.darkMode === 'boolean'

const updateTheme = (theme: Theme, darkMode: boolean): Theme => {
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
  return theme
}

const current = (): StoreItem => {
  const currentItem = store.last()
  return isStoreItem(currentItem) ? currentItem : storeItem
}

const prev = (item: StoreItem, newItem: StoreItem) => {
  store.push(newItem)
  const prevItem = store.last()
  console.log({ prevItem })
  return isStoreItem(prevItem) ? prevItem : item
}

const SiteLayout: FunctionComponent<SiteLayoutProps> = ({ children }) => {
  const [{ timestamp, darkMode }, setDarkMode] = useReducer(prev, current())

  console.log({
    darkMode,
    timestamp,
    i: store.last(),
    b: isStoreItem(store.last()),
  })
  const setupTheme = updateTheme(darkMode ? darkTheme : lightTheme, darkMode)

  const [theme, setTheme] = useState<Theme>(setupTheme)

  useEffect(() => {
    const setupTheme = updateTheme(darkMode ? darkTheme : lightTheme, darkMode)
    setTheme(setupTheme)
  }, [darkMode])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <button
        onClick={() =>
          setDarkMode({ timestamp: Date.now(), darkMode: !darkMode })
        }
      >
        Toggle
      </button>
      {children}
    </ThemeProvider>
  )
}

export { SiteLayout }
