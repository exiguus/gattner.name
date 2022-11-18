import React, {
  useRef,
  useLayoutEffect,
  FunctionComponent,
  MutableRefObject,
} from 'react'
import styled from 'styled-components'
import { getRandomInt } from '@gattner/utils'
import { track } from '../../../lib/tracker'

// jest does not support es modules
// because we us ts-jest to compile typescript
// not babel with @babel/plugin-transform-modules-commonjs
// at this time, so we use require
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Randext = require('../../../../node_modules/randext/dist/randext.min.js')

const StyledAnimation = styled.span`
  display: block;
  unicode-bidi: embed;
  font-size: 5.2vh;
  font-weight: 600;
  letter-spacing: 0.064em;
  line-height: 1.875em;
  white-space: pre-line;
  width: 100%;
  color: inherit;
  opacity: 0;

  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    font-size: 6.4vh;
    /* allow oversized words, without line-break them */
    width: 120%;
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
      callback: () =>
        track({
          type: 'animation',
          msg: 'Animation randext finished',
          value: `Animation randext finished with text "${JSON.stringify(
            paragraphRef.current.innerText
          )}"`,
        }),
    })
    const timeout = setTimeout(() => {
      randext.start()
      track({
        type: 'animation',
        msg: 'Animation randext started',
        value: `Animation randext started with text "${JSON.stringify(
          paragraphRef.current.innerText
        )}"`,
      })
    }, wait)
    return (): void => {
      clearTimeout(timeout)
      randext.stop()
      track({
        type: 'animation',
        msg: 'Animation randext stopped',
        value: `Animation randext stopped with text "${JSON.stringify(
          paragraphRef.current.innerText
        )}"`,
      })
    }
  }, [paragraphRef, text])

  return (
    <StyledAnimation data-testid="randext" ref={paragraphRef}>
      {text}
    </StyledAnimation>
  )
}

export { Animation }
