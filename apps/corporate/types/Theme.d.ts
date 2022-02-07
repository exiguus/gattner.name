export type ThemeBase = {
  fonts: {
    monospace: string
  }
  application: {
    margin: string
    padding: string
    minHeight: string
  }
  section: {
    maxWidthTablet: string
    maxWidthDesktop: string
    marginBottom: string
    column: {
      padding: string
      paddingMobile: string
    }
  }
  breakpoint: {
    screen4k: string
    screenLaptop: string
    screenLaptopL: string
    screenMobileL: string
    screenMobileM: string
    screenMobileS: string
    screenMobileSM: string
    screenTablet: string
  }
}

export type ThemeExtended = {
  name: string
  application: {
    backgroundColor: string
    backgroundAnimationColor: string
    color: string
    highlightColor: string
  }
  link: {
    color: string
    hoverColor: string
  }
}

export type Theme = ThemeBase & ThemeExtended
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
