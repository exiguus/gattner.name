import { createGlobalStyle } from 'styled-components'

const Body = createGlobalStyle`
  @keyframes fadeInBody {
    0% {
      background-color: ${(props): string =>
        props.theme.application.backgroundAnimationColor};;
      opacity: 0;
    }
    100% {
      background-color: ${(props): string =>
        props.theme.application.backgroundColor};
      opacity: 1;
    }
  }
  body {
    padding: 0;
    margin: 0;
    min-height: 100vh;
    font-family: ${(props): string => props.theme.fonts.monospace};
    font-size: 100%;
    font-weight: 300;
    line-height: 1.4;
    background-color: ${(props): string =>
      props.theme.application.backgroundColor};
    color: ${(props): string => props.theme.application.color};
    animation: fadeInBody .6s ease-in;
    @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenMobileS}) {
      font-size: 90%;
    }
    @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
      font-size: 100%;
    }
    @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenLaptop}) {
      font-size: 120%;
    }
    @media (min-width: ${(props): string => props.theme.breakpoint.screen4k}) {
      font-size: 150%;
    }

    #root {
      min-height: 100vh;
    }
  }

  ::selection {
    background-color: ${(props): string =>
      props.theme.application.highlightColor};
  }
`

export { Body }
