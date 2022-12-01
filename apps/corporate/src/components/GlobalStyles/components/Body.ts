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

  html {
    /**
     * Adoptive Typography
     * font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])));
     * See: https://css-tricks.com/snippets/css/fluid-typography/
     */
    @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenMobileS}) {
      font-size: calc(${(props): string =>
        `${props.theme.fonts.fontSize}px`} + 6 * ((100vw - ${(props): string =>
  props.theme.breakpoint.screenMobileS}) / 680));
    }
    @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
      font-size: calc(${(props): string =>
        `${props.theme.fonts.fontSize}px`} + 6 * ((100vw - ${(props): string =>
  props.theme.breakpoint.screenTablet}) / 680));
    }
    @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenLaptop}) {
      font-size: calc(${(props): string =>
        `${props.theme.fonts.fontSize}px`} + 6 * ((100vw - ${(props): string =>
  props.theme.breakpoint.screenLaptop}) / 680));
    }
    @media (min-width: ${(props): string => props.theme.breakpoint.screen4k}) {
      font-size: calc(${(props): string =>
        `${props.theme.fonts.fontSize}px`} + 6 * ((100vw - ${(props): string =>
  props.theme.breakpoint.screen4k}) / 680));
    }
  }

  body {
    padding: 0;
    margin: 0;
    min-height: 100vh;
    font-family: ${(props): string => props.theme.fonts.monospace};
    font-weight: 300;
    line-height: 1.4;
    background-color: ${(props): string =>
      props.theme.application.backgroundColor};
    color: ${(props): string => props.theme.application.color};
    animation: fadeInBody .6s ease-in;

    #root {
      min-height: 100vh;
    }
  }

  a {
    color: ${(props): string => props.theme.link.color};

    &:hover {
      color: ${(props): string => props.theme.link.hoverColor};
    }

    &:link,
    &:hover,
    &:active,
    &:focus,
    &:visited {
      color: ${(props): string => props.theme.link.color};
    }
  }

  svg {
    fill: ${(props): string => props.theme.application.color};
  }

  ::selection {
    background-color: ${(props): string =>
      props.theme.application.highlightColor};
  }
`

export { Body }
