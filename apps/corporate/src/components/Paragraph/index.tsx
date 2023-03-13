import React, { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import { Animation } from './components/Animation'
import { isPrerender } from '../../utils/prerender'
import { SrOnly } from '../SrOnly'

type AlignProps = 'left' | 'right' | 'center'

const StyledParagraph = styled.p<{ align?: AlignProps }>`
  font-size: 1.2em;
  margin-bottom: 1rem;
  ${props => props.align && `text-align: ${props.align}`}
`

type CommonProps = {
  isContent?: boolean
  dataTestId?: string
  align?: AlignProps
}

type TruncateProps =
  | { children: ReactNode; text?: never; animate?: never }
  | { children?: never; text: string; animate?: boolean }

type ParagraphProps = CommonProps & TruncateProps

const Paragraph: FunctionComponent<ParagraphProps> = ({
  text,
  align,
  animate = false,
  isContent,
  dataTestId,
  children,
  ...props
}) => {
  const isAnimate = !!(animate && text && !isPrerender())
  return (
    <>
      <StyledParagraph
        data-content={isContent}
        data-testid={dataTestId}
        aria-hidden={isAnimate || undefined}
        align={align}
        {...props}
      >
        {/* this should be by default invisible until the animation start */}
        {isAnimate
          ? text
              .split(' ')
              .map((word, index) => (
                <Animation key={index} word={word} text={text} />
              ))
          : text
          ? text
          : children}
      </StyledParagraph>
      {isAnimate && (
        <SrOnly>
          <Paragraph>{text}</Paragraph>
        </SrOnly>
      )}
    </>
  )
}

export { Paragraph }
