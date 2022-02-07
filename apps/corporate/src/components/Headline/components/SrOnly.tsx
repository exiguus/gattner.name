import { FunctionComponent } from 'preact'
import React, { ReactNode } from 'react'
import styled from 'styled-components'

const StyledText = styled.span`
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
`

interface SrOnlyProps {
  children: ReactNode
}

const SrOnly: FunctionComponent<SrOnlyProps> = ({ children }) => {
  return <StyledText>{children}</StyledText>
}

export { SrOnly }
