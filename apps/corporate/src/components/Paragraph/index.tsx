import React, { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import { Animation } from './components/Animation'
import { isPrerender } from '../../utils/prerender'
import { SrOnly } from '../SrOnly'

enum Size {
  sm = '1em',
  md = '1.2em',
  lg = '1.4em',
  xl = '1.8em',
}

type AlignProps = 'left' | 'right' | 'center'
type SizeProps = keyof typeof Size

const StyledParagraph = styled.p<{
  align?: AlignProps
  size?: SizeProps
  indent?: boolean
}>`
  ${props => props.align && `text-align: ${props.align};`}
  ${props => props.size && `font-size: ${Size[props.size]};`}
  ${props => props.indent && `text-indent: 12.5%;`}
  margin-bottom: 1rem;
`

type CommonProps = {
  isContent?: boolean
  dataTestId?: string
  align?: AlignProps
  size?: SizeProps
  indent?: boolean
}

type TruncateProps =
  | { children: ReactNode; text?: never; animate?: never }
  | { children?: never; text: string; animate?: boolean }

type ParagraphProps = CommonProps & TruncateProps

const Paragraph: FunctionComponent<ParagraphProps> = ({
  text,
  align,
  size = 'md',
  indent = false,
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
        indent={indent}
        size={size}
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
        <SrOnly asHtml="div">
          <Paragraph>{text}</Paragraph>
        </SrOnly>
      )}
    </>
  )
}

export { Paragraph }
