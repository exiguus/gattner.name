import React, { FunctionComponent, ReactNode } from 'react'
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

const StyledFigcaption = styled.figcaption`
  display: block;
  text-align: right;
  width: 100%;
`

type OptionalProps =
  | { quote: string; children?: never }
  | { quote?: never; children: ReactNode }

export type BlockquoteProps = {
  author?: string
  cite?: string
} & OptionalProps

const Blockquote: FunctionComponent<BlockquoteProps> = ({
  author,
  cite,
  quote,
  children,
  ...props
}) => {
  return (
    <figure {...props}>
      <StyledBlockquote>{quote || children}</StyledBlockquote>
      {author && (
        <StyledFigcaption>
          ― {author}
          {cite && (
            <>
              , <cite>{cite}</cite>
            </>
          )}
        </StyledFigcaption>
      )}
    </figure>
  )
}

export { Blockquote }
