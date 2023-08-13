import { createGlobalStyle } from 'styled-components'
import '@gattner/types'

/**
 * IBM / plex
 * IBM Plex Mono
 * SOURCE https://github.com/IBM/plex
 * LICENCE https://github.com/IBM/plex/blob/master/LICENSE.txt
 */
import IBMPlexMono300Woff from '../../../assets/fonts/ibm-plex-mono-v6-latin-300.woff'
import IBMPlexMono300Woff2 from '../../../assets/fonts/ibm-plex-mono-v6-latin-300.woff2'
import IBMPlexMono600Woff from '../../../assets/fonts/ibm-plex-mono-v6-latin-600.woff'
import IBMPlexMono600Woff2 from '../../../assets/fonts/ibm-plex-mono-v6-latin-600.woff2'

const Fonts = createGlobalStyle`
  @font-face {
    font-family: 'IBM Plex Mono';
    font-weight: 300;
    src: local('IBM Plex Mono'),
      url(${IBMPlexMono300Woff2}) format('woff2'),
      url(${IBMPlexMono300Woff}) format('woff');
    font-display: fallback;
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-weight: 600;
    src: local('IBM Plex Mono'),
      url(${IBMPlexMono600Woff2}) format('woff2'),
      url(${IBMPlexMono600Woff}) format('woff');
    font-display: fallback;
  }
`

export { Fonts }
