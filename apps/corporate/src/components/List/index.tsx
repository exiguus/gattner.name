import React, { FunctionComponent, ReactNode } from 'react'
import styled, {
  css,
  DefaultTheme,
  FlattenInterpolation,
  ThemedStyledProps,
} from 'styled-components'

type ListStyleType = 'disc' | 'circle' | 'square' | 'none'

interface ListProps {
  type?: 'nav' | 'footer' | 'menu' | 'line'
  listStyleType?: ListStyleType
  children: ReactNode
}

const typeNavCSS = css<ListProps>`
  padding: 0 0.5rem;
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    padding: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`

const typeFooterCSS = css<ListProps>`
  display: flex;
  min-width: 12.5rem;
  align-items: flex-start;
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    justify-content: space-between;
    align-items: center;
  }
`

const typeMenuCSS = css<ListProps>`
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`

const typeLineCSS = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  li + li {
    padding-left: 1em;
  }

  li + li::before {
    position: relative;
    top: -0.333em;
    left: -0.5em;
    content: '·';
  }
`

const StyledList = styled.ul<ListProps>`
  ${(props): string | undefined =>
    props.listStyleType && `list-style-type: ${props.listStyleType}`};
  ${(
    props
  ): FlattenInterpolation<ThemedStyledProps<ListProps, DefaultTheme>> | false =>
    props.type === 'nav' && typeNavCSS}
  ${(
    props
  ): FlattenInterpolation<ThemedStyledProps<ListProps, DefaultTheme>> | false =>
    props.type === 'footer' && typeFooterCSS}
  ${(
    props
  ): FlattenInterpolation<ThemedStyledProps<ListProps, DefaultTheme>> | false =>
    props.type === 'menu' && typeMenuCSS}
  ${(
    props
  ): FlattenInterpolation<ThemedStyledProps<ListProps, DefaultTheme>> | false =>
    props.type === 'line' && typeLineCSS}
`

export const List: FunctionComponent<ListProps> = ({
  listStyleType,
  type,
  children,
}) => (
  <StyledList type={type} listStyleType={listStyleType}>
    {children}
  </StyledList>
)
