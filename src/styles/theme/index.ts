import merge from '../../utils/merge'
import { getRandomInt } from '../../utils'
import { Theme, ThemeBase, ThemeExtended } from 'types/Theme'
import { variables } from './variables'

const rem = ({
  px,
  base = variables.FontSize,
}: {
  px: number
  base?: number
}): string => {
  return `${px / base}rem`
}

// HSL
// S (saturation) and L (lightness) are percentages. 100% saturation is completely saturated, while 0% is completely unsaturated (gray). 100% lightness is white, 0% lightness is black, and 50% lightness is “normal.”
// A (alpha) can be a <number> between 0 and 1, or a <percentage>, where the number 1 corresponds to 100% (full opacity).
// H (hue) see: https://drafts.csswg.org/css-color/#the-hsl-notation
const getRandomHSLColor = (saturation = '20%', alpha = '80%') => {
  const hue = `${getRandomInt(0, 360)}deg`
  return [hue, saturation, alpha]
}

const getRandomHSLColors = (count = 99, saturation = '20%', alpha = '80%') => {
  const colors = []
  for (let i = 0; i < count; i++) {
    colors.push(getRandomHSLColor(saturation, alpha))
  }
  return colors
}

export function getRandomColor(): [string, string, string] {
  const colors = getRandomHSLColors()
  const max = colors.length - 1
  const min = 0
  const [hue, saturation, alpha] = colors[getRandomInt(min, max)]
  return [hue, saturation, alpha]
}

const [backgroundHue, backgroundSaturation, backgroundAlpha] = getRandomColor()

export const theme: ThemeBase = {
  fonts: {
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
  section: {
    maxWidthDesktop: `${variables.MaxSectionWidth / 16}vw`,
    maxWidthTablet: rem({ px: variables.MaxSectionWidth }),
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
