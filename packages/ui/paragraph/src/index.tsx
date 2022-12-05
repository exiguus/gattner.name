import React, { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import { Animation } from './components/Animation'

type AlignProps = 'left' | 'right' | 'center'

const StyledParagraph = styled.p<{ align?: AlignProps }>`
  font-size: 1.2em;
  margin-bottom: 1rem;
  ${props => props.align && `text-align: ${props.align}`};
`

type CommonProps = {
  isContent?: boolean
  dataTestId?: string
  align?: AlignProps
}

type TruncateProps =
  | { children: ReactNode; text?: never; animate?: never }
  | { children?: never; text: string; animate?: boolean }

export type ParagraphProps = CommonProps & TruncateProps

const Paragraph: FunctionComponent<ParagraphProps> = ({
  text,
  align,
  animate = false,
  isContent,
  dataTestId,
  children,
}) => {
  return (
    <StyledParagraph
      data-content={isContent}
      data-testid={dataTestId}
      align={align}
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
