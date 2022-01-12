import React, { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import { Animation } from './components/Animation'
import { isPrerender } from '../../utils/prerender'

const StyledParagraph = styled.p`
  margin-bottom: 1rem;
`

type CommonProps = {
  isContent?: boolean
  dataTestId?: string
}

type TruncateProps =
  | { children: ReactNode; text?: never; animate?: never }
  | { children?: never; text: string; animate?: boolean }

type ParagraphProps = CommonProps & TruncateProps

const Paragraph: FunctionComponent<ParagraphProps> = ({
  text,
  animate = false,
  isContent,
  dataTestId,
  children,
}) => {
  return (
    <StyledParagraph data-content={isContent} data-testid={dataTestId}>
      {animate && text && !isPrerender()
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
