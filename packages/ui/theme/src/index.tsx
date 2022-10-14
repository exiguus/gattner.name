import type { Theme, ThemeBase, ThemeExtended } from './theme/types'
import { GlobalStyles, BrowserReset, Fonts, Root } from './GlobalStyles'
import { theme, themeLight, themeDark, darkTheme, lightTheme } from './theme'
import { variables } from './theme/variables'
import { rem, getRandomColor, hex2rgba } from './theme/utils'

export { GlobalStyles, BrowserReset, Fonts, Root }
export { theme, themeLight, themeDark, darkTheme, lightTheme }
export { variables as themeVariables }
export { rem, getRandomColor, hex2rgba }
export type { Theme, ThemeBase, ThemeExtended }
