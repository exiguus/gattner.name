import React, { FunctionComponent, ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

const StyledSection = styled.section`
  margin-bottom: ${(props): string => props.theme.section.marginBottom};
`
const StyledColumn = styled.div`
  padding-left: ${(props): string => props.theme.section.column.paddingMobile};
  padding-right: ${(props): string => props.theme.section.column.paddingMobile};
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    padding-left: ${(props): string => props.theme.section.column.padding};
    padding-right: ${(props): string => props.theme.section.column.padding};
  }
`

interface SectionProps {
  children: ReactNode | ReactElement
}
const Section: FunctionComponent<SectionProps> = ({ children }) => {
  return (
    <StyledSection>
      <StyledColumn>{children}</StyledColumn>
    </StyledSection>
  )
}

export { Section }
