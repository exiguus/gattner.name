import { createContext, Dispatch } from 'react'
import { lightTheme } from '../../styles/theme'
import { Theme } from '../../../types/Theme'

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
