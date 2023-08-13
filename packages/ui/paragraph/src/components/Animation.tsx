import React, {
  useRef,
  useLayoutEffect,
  FunctionComponent,
  MutableRefObject,
} from 'react'
import styled from 'styled-components'
import '@gattner/types'
import Randext from 'randext'
import { getRandomInt } from '@gattner/utils'

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

  @media (min-width: ${(props): string =>
      props.theme.breakpoint?.screenTablet ?? '768px'}) {
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
    const randext = new Randext({
      element: paragraphRef.current,
      ignore: '_,;:./[]<>\\\'"`#$%&@€!?',
      interval: wait / 100 < 15 ? Math.round((wait / 12) * 2) : 120,
    })
    const timeout = setTimeout(() => {
      randext.start()
    }, wait)
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
