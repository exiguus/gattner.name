import { FunctionComponent } from 'preact'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { SrOnly } from './components/SrOnly'

const StyledHeadline = styled.h1`
  margin-bottom: 1rem;
  font-weight: 600;
`

const StyledIcon = styled.div`
  display: block;
  margin: 0 auto 1rem auto;
  max-width: 100%;
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenMobileL}) {
    padding: 3rem 0 0 0;
    max-width: 20rem;
  }
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    padding: 4rem 0 1rem 0;
    max-width: 18rem;
  }
`

interface HeadlineProps {
  text?: string
  icon?: ReactNode
  srOnly?: boolean
}

const Headline: FunctionComponent<HeadlineProps> = ({
  text,
  icon,
  srOnly = false,
}) => {
  return (
    <StyledHeadline>
      {(text && icon) || (text && srOnly) ? <SrOnly>{text}</SrOnly> : text}
      {icon && <StyledIcon>{icon}</StyledIcon>}
    </StyledHeadline>
  )
}

export { Headline }
