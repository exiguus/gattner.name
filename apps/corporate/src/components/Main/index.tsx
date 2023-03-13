import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Container } from '../Container'

const StyledMainInner = styled.div`
  margin-bottom: 2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`
const Main: FunctionComponent = ({ children }) => {
  return (
    <main id="main">
      <Container>
        <StyledMainInner>{children}</StyledMainInner>
      </Container>
    </main>
  )
}

export { Main }
