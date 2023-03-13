import React, { FunctionComponent, ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  margin-bottom: ${(props): string => props.theme.container.marginBottom};
`
const StyledColumn = styled.div`
  padding-left: ${(props): string =>
    props.theme.container.column.paddingMobile};
  padding-right: ${(props): string =>
    props.theme.container.column.paddingMobile};
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    padding-left: ${(props): string => props.theme.container.column.padding};
    padding-right: ${(props): string => props.theme.container.column.padding};
  }
`

interface ContainerProps {
  children: ReactNode | ReactElement
}
const Container: FunctionComponent<ContainerProps> = ({ children }) => {
  return (
    <StyledContainer>
      <StyledColumn>{children}</StyledColumn>
    </StyledContainer>
  )
}

export { Container }
