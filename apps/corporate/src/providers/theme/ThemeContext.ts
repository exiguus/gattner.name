import { createContext, Dispatch } from 'react'
import { lightTheme, Theme } from '@gattner/ui-theme'

export type StoreItem = { timestamp: number; darkMode: boolean }

export type ThemeContextProps = {
  theme: Theme
  darkMode: boolean
  setDarkMode: Dispatch<StoreItem>
}

export const defaultProps: ThemeContextProps = {
  theme: lightTheme,
  darkMode: false,
  setDarkMode: () => null,
}

export const ThemeContext = createContext<ThemeContextProps>(defaultProps)
