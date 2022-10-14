import { merge } from '@gattner/utils'
import { Theme, ThemeBase, ThemeExtended } from './types'
import { variables } from './variables'
import { rem, getRandomColor } from './utils'

const [backgroundHue, backgroundSaturation, backgroundAlpha] = getRandomColor()

export const theme: ThemeBase = {
  fonts: {
    fontSize: variables.FontSize,
    monospace:
      'IBM Plex Mono, Menlo, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier, monospace',
  },
  application: {
    margin: rem({ px: variables.FontSize }),
    padding: rem({ px: variables.Padding }),
    minHeight: `${variables.MinHeight}vh`,
  },
  breakpoint: {
    screen4k: rem({ px: variables.screen4k }),
    screenLaptop: rem({ px: variables.screenLaptop }),
    screenLaptopL: rem({
      px: variables.screenLaptopL,
      base: variables.FontSize,
    }),
    screenMobileL: rem({
      px: variables.screenMobileL,
      base: variables.FontSize,
    }),
    screenMobileM: rem({
      px: variables.screenMobileM,
      base: variables.FontSize,
    }),
    screenMobileS: rem({
      px: variables.screenMobileS,
      base: variables.FontSize,
    }),
    screenMobileSM: rem({
      px: variables.screenMobileSM,
      base: variables.FontSize,
    }),
    screenTablet: rem({ px: variables.screenTablet }),
  },
  container: {
    maxWidthDesktop: rem({ px: variables.MaxContainerWidth }),
    maxWidthTablet: rem({ px: variables.MaxContainerWidth }),
    marginBottom: rem({ px: variables.FontSize }),
    column: {
      padding: rem({ px: variables.Padding }),
      paddingMobile: rem({ px: variables.Padding * 2 }),
    },
  },
}

export const themeDark: ThemeExtended = {
  name: 'dark',
  application: {
    backgroundColor: `hsl(${backgroundHue}, 90%, 5%, 0.8)`,
    backgroundAnimationColor: `hsl(${backgroundHue}, 90%, 5%)`,
    color: variables.BrandSecondary,
    highlightColor: `hsl(${getRandomColor()}, 0.3)`,
  },
  link: {
    color: variables.BrandSecondary,
    hoverColor: variables.BrandSecondaryHover,
  },
}

export const themeLight: ThemeExtended = {
  name: 'light',
  application: {
    backgroundColor: `hsl(${backgroundHue}, ${backgroundSaturation}, ${backgroundAlpha}, 0.5)`,
    backgroundAnimationColor: `hsl(${backgroundHue}, ${backgroundSaturation}, ${backgroundAlpha})`,
    color: variables.BrandPrimary,
    highlightColor: `hsl(${getRandomColor()})`,
  },
  link: {
    color: variables.BrandPrimary,
    hoverColor: variables.BrandPrimaryHover,
  },
}

export const darkTheme: Theme = merge(theme, themeDark)
export const lightTheme: Theme = merge(theme, themeLight)
