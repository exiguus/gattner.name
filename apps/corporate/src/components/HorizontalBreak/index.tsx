import React, { ReactElement } from 'react'
import styled from 'styled-components'

const StyledHorizontalBreak = styled.hr`
  margin-bottom: 2rem;
  border: none;
`

const HorizontalBreak = (): ReactElement => {
  return <StyledHorizontalBreak aria-hidden="true" />
}

export { HorizontalBreak }
