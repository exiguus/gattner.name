import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Animation } from './components/Animation'
import { isServer } from '../../utils/ssr'

const StyledParagraph = styled.p`
  margin-bottom: 1rem;
`

interface ParagraphProps {
  text: string
  animate?: boolean
}

const Paragraph: FunctionComponent<ParagraphProps> = ({
  text,
  animate = false,
}) => {
  return (
    <StyledParagraph>
      {animate && !isServer()
        ? text
            .split(' ')
            .map((word, index) => <Animation key={index} text={word} />)
        : text}
    </StyledParagraph>
  )
}

export { Paragraph }
