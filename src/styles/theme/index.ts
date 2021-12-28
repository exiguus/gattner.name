import { getRandomInt } from '../../utils'
import { Theme } from 'types/Theme'
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

export function getRandomColor(): string {
  const colors = ['255,0,0', '0,255,0', '0,0,255']
  const max = colors.length
  const min = 0
  return colors[getRandomInt(min, max)]
}

export const theme: Theme = {
  fonts: {
    monospace:
      'IBM Plex Mono, Menlo, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier, monospace',
  },
  application: {
    backgroundColor: variables.White,
    color: variables.BrandPrimary,
    margin: rem({ px: variables.FontSize }),
    padding: rem({ px: variables.Padding }),
    minHeight: `${variables.MinHeight}vh`,
    highlightColor: getRandomColor(),
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
  link: {
    color: variables.BrandPrimary,
    hoverColor: variables.BrandPrimaryHover,
  },
}

export default theme
