import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

interface MarkProps {
  children: React.ReactNode
}

export const Mark: FunctionComponent<MarkProps> = ({ children }) => (
  <StyledMark>{children}</StyledMark>
)

const StyledMark = styled.mark`
  color: ${(props): string => props.theme.application.color};
  background-color: ${(props): string =>
    props.theme.application.highlightColor};
`
