import React, {
  useRef,
  useLayoutEffect,
  FunctionComponent,
  MutableRefObject,
} from 'react'
import styled from 'styled-components'
// import Randext from 'randext'
import { getRandomInt } from '../../../utils'

// jest does not support es modules
// because we us ts-jest to compile typescript
// not babel with @babel/plugin-transform-modules-commonjs
// at this time, so we use require
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Randext = require('../../../../node_modules/randext/dist/randext.min.js')

const StyledAnimation = styled.span`
  display: block;
  unicode-bidi: embed;
  font-size: 5.6vh;
  font-weight: 600;
  letter-spacing: 0.064em;
  line-height: 1.875em;
  white-space: pre-line;
  width: 100%;
  color: inherit;
  opacity: 0;

  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    font-size: 5.8vh;
  }

  [data-randext-char] {
    display: inline-block;
    width: 0.65em;
    height: 1.66em;
    font-size: inherit;
    font-family: inherit;
    letter-spacing: inherit;
    line-height: 1.6em;
    vertical-align: middle;
    opacity: 1;
  }
`

interface AnimationProps {
  text: string
}
const Animation: FunctionComponent<AnimationProps> = ({ text }) => {
  const paragraphRef = useRef() as MutableRefObject<HTMLParagraphElement>
  useLayoutEffect(() => {
    paragraphRef.current.setAttribute('data-randext', 'false')
    if (!paragraphRef.current.innerText) paragraphRef.current.innerText = text
    const wait = getRandomInt(2, 30) * 100
    const randext = new Randext.default({
      element: paragraphRef.current,
      ignore: '_,;:./[]<>\\\'"`#$%&@€!?',
      interval: wait / 100 < 15 ? Math.round((wait / 12) * 2) : 120,
    })
    const timeout = setTimeout(() => randext.start(), wait)
    return (): void => {
      clearTimeout(timeout)
      randext.stop()
    }
  }, [paragraphRef, text])

  return (
    <StyledAnimation data-testid="randext" ref={paragraphRef}>
      {text}
    </StyledAnimation>
  )
}

export { Animation }
