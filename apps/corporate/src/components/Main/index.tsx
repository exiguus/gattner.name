import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Section } from '../Section'

const StyledMainInner = styled.div`
  margin-bottom: 2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`
const Main: FunctionComponent = ({ children }) => {
  return (
    <main>
      <Section>
        <StyledMainInner>{children}</StyledMainInner>
      </Section>
    </main>
  )
}

export { Main }
