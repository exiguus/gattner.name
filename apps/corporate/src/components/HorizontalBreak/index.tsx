import React, { ReactElement } from 'react'
import styled from 'styled-components'

const StyledHorizontalBreak = styled.hr<{ line?: boolean }>`
  margin-bottom: 2rem;
  border: none;
  ${(props): string =>
    props.line
      ? `
        padding-top: 2rem;
        padding-bottom: 2rem;
        margin-bottom: 2rem;

        &:after {
          content: '';
          display: block;
          width: 50%;
          height: 1px;
          margin: 0 auto;
          background-color: ${props.theme.application.color};
        }
      `
      : ''}
`

const HorizontalBreak = ({
  line = false,
}: {
  line?: boolean
}): ReactElement => {
  return <StyledHorizontalBreak line={line} aria-hidden="true" />
}

export { HorizontalBreak }
