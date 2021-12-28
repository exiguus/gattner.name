export type Theme = {
  fonts: {
    monospace: string
  }
  application: {
    backgroundColor: string
    color: string
    margin: string
    padding: string
    minHeight: string
    highlightColor: string
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
  link: {
    color: string
    hoverColor: string
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

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
