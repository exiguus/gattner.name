import React, {
  useRef,
  useLayoutEffect,
  FunctionComponent,
  MutableRefObject,
} from 'react'
import styled from 'styled-components'
import { getRandomInt } from '@gattner/utils'

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
    will-change: contents, opacity;
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
  word: string
  text: string
}
const Animation: FunctionComponent<AnimationProps> = ({ text, word }) => {
  const paragraphRef = useRef() as MutableRefObject<HTMLParagraphElement>
  useLayoutEffect(() => {
    paragraphRef.current.setAttribute('data-randext', 'false')
    if (!paragraphRef.current.innerText) paragraphRef.current.innerText = word
    const wait = getRandomInt(2, 30) * 100
    const randext = new Randext.default({
      element: paragraphRef.current,
      ignore: '_,;:./[]<>\\\'"`#$%&@€!?',
      interval: wait / 100 < 15 ? Math.round((wait / 12) * 2) : 120,
      callback: () => {
        if (word === text.split(' ')[text.split(' ').length]) {
          import('../../../lib/tracker').then(({ track }) => {
            track({
              type: 'animation',
              msg: 'Animation randext finished',
              value: `Animation randext finished with text "${text}"`,
            })
          })
        }
      },
    })
    const timeout = setTimeout(() => {
      randext.start()
      if (word === text.split(' ')[0]) {
        import('../../../lib/tracker').then(({ track }) => {
          track({
            type: 'animation',
            msg: 'Animation randext started',
            value: `Animation randext started with text "${text}"`,
          })
        })
      }
    }, wait)
    return (): void => {
      clearTimeout(timeout)
      randext.stop()
      import('../../../lib/tracker').then(({ track }) => {
        track({
          type: 'animation',
          msg: 'Animation randext stopped',
          value: `Animation randext stopped with text "${text}"`,
        })
      })
    }
  }, [paragraphRef, text, word])

  return (
    <StyledAnimation
      data-testid="randext"
      ref={paragraphRef}
      aria-hidden="true"
    >
      {word}
    </StyledAnimation>
  )
}

export { Animation }
