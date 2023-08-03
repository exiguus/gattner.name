import React, { ReactNode, FunctionComponent } from 'react'
import styled from 'styled-components'
import { TextSizes, TextSize, TextAlign } from '@gattner/ui-theme'

import { SrOnly } from './components/SrOnly'

const StyledHeadline = styled.h1<{ size: TextSize; align?: TextAlign }>`
  margin-bottom: 1rem;
  font-weight: 600;
  ${props => props.align && `text-align: ${props.align}`};
  ${props => props.size && `font-size: ${TextSizes[props.size]}`};
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

type OptionalProps =
  | { text: string; children?: never }
  | { text?: never; children: ReactNode }

export type HeadlineProps = {
  size?: TextSize
  align?: TextAlign
  icon?: ReactNode
  srOnly?: boolean
} & OptionalProps

const Headline: FunctionComponent<HeadlineProps> = ({
  text,
  icon,
  align,
  size = 'md',
  srOnly = false,
  children,
}) => {
  return (
    <StyledHeadline align={align} size={size}>
      {((text || children) && icon) || ((text || children) && srOnly) ? (
        <SrOnly>{text || children}</SrOnly>
      ) : (
        text || children
      )}
      {icon && <StyledIcon>{icon}</StyledIcon>}
    </StyledHeadline>
  )
}

export { Headline }
