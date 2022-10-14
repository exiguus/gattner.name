import { merge } from '@gattner/utils'
import {
  theme,
  themeLight,
  themeDark,
  Theme,
  ThemeBase,
  ThemeExtended,
  rem,
  getRandomColor,
  themeVariables,
} from '@gattner/ui-theme'

const [backgroundHue, backgroundSaturation, backgroundAlpha] = getRandomColor()

export const appTheme: ThemeBase = merge(theme, {
  application: {
    margin: rem({ px: themeVariables.FontSize }),
    padding: rem({ px: themeVariables.Padding }),
    minHeight: `${themeVariables.MinHeight}vh`,
  },
  section: {
    maxWidthDesktop: rem({ px: themeVariables.MaxContainerWidth }),
    maxWidthTablet: rem({ px: themeVariables.MaxContainerWidth }),
    marginBottom: rem({ px: themeVariables.FontSize }),
    column: {
      padding: rem({ px: themeVariables.Padding }),
      paddingMobile: rem({ px: themeVariables.Padding * 2 }),
    },
  },
})

export const appThemeDark: ThemeExtended = merge(themeDark, {
  application: {
    backgroundColor: `hsl(${backgroundHue}, 90%, 5%, 0.8)`,
    backgroundAnimationColor: `hsl(${backgroundHue}, 90%, 5%)`,
    color: themeVariables.BrandSecondary,
    highlightColor: `hsl(${getRandomColor()}, 0.3)`,
  },
  link: {
    color: themeVariables.BrandSecondary,
    hoverColor: themeVariables.BrandSecondaryHover,
  },
})

export const appThemeLight: ThemeExtended = merge(themeLight, {
  application: {
    backgroundColor: `hsl(${backgroundHue}, ${backgroundSaturation}, ${backgroundAlpha}, 0.5)`,
    backgroundAnimationColor: `hsl(${backgroundHue}, ${backgroundSaturation}, ${backgroundAlpha})`,
    color: themeVariables.BrandPrimary,
    highlightColor: `hsl(${getRandomColor()})`,
  },
  link: {
    color: themeVariables.BrandPrimary,
    hoverColor: themeVariables.BrandPrimaryHover,
  },
})

export const darkTheme: Theme = merge(appTheme, themeDark)
export const lightTheme: Theme = merge(appTheme, themeLight)
