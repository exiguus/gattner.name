import React, { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import { Animation } from './components/Animation'
import { TextSizes, TextSize, TextAlign } from '@gattner/ui-theme'

const StyledParagraph = styled.p<{
  size?: TextSize
  align?: TextAlign
  indent?: boolean
}>`
  font-size: 1.2em;
  margin-bottom: 1rem;
  ${props => props.align && `text-align: ${props.align}`};
  ${props => props?.indent && `text-indent: 2.4rem`};
  ${props => props.size && `font-size: ${TextSizes[props.size]}`};
`

type CommonProps = {
  isContent?: boolean
  indent?: boolean
  dataTestId?: string
  align?: TextAlign
  size?: TextSize
}

type TruncateProps =
  | { children: ReactNode; text?: never; animate?: never }
  | { children?: never; text: string; animate?: boolean }

export type ParagraphProps = CommonProps & TruncateProps

const Paragraph: FunctionComponent<ParagraphProps> = ({
  text,
  align,
  size = 'md',
  animate = false,
  indent = false,
  isContent,
  dataTestId,
  children,
}) => {
  return (
    <StyledParagraph
      data-content={isContent}
      data-testid={dataTestId}
      align={align}
      size={size}
      indent={indent}
    >
      {animate && text
        ? text
            .split(' ')
            .map((word, index) => <Animation key={index} text={word} />)
        : text
        ? text
        : children}
    </StyledParagraph>
  )
}

export { Paragraph }
