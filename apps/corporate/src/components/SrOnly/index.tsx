import { FunctionComponent } from 'preact'
import React, { ComponentType, ReactNode } from 'react'
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
  asHtml?: string | ComponentType<unknown> | undefined
  children: ReactNode
}

const SrOnly: FunctionComponent<SrOnlyProps> = ({
  asHtml = 'span',
  children,
}) => {
  return <StyledText as={asHtml}>{children}</StyledText>
}

export { SrOnly }
