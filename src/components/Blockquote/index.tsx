import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

const StyledBlockquote = styled.blockquote`
  font-size: 2em;
  p {
    padding: 0 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  p::before {
    content: '\\201C';
  }
  p::after {
    content: '\\201D';
  }
`

const Blockquote = ({ children }: { children: ReactNode }): ReactElement => {
  return <StyledBlockquote>{children}</StyledBlockquote>
}

export { Blockquote }
