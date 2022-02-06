import React, { FunctionComponent, ReactNode } from 'react'
import styled, {
  css,
  DefaultTheme,
  FlattenInterpolation,
  ThemedStyledProps,
} from 'styled-components'

const typeNavCSS = css<ListItemProps>`
  display: inline-block;
  margin-right: 1em;
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    display: block;
    margin-left: 1em;
    margin-right: 0;
  }
  text-decoration: none;

  a.active {
    font-weight: 600;
  }
`

const typeIconCSS = css`
  display: block;
  min-width: 1.5rem;
`

const typeMenuCSS = css<ListItemProps>`
  display: inline-block;
  margin-right: 1em;
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    display: block;
    margin-left: 1em;
    margin-right: 0;
  }
  text-decoration: none;
`

const StyledListItem = styled.li<ListItemProps>`
  ${(
    props
  ):
    | FlattenInterpolation<ThemedStyledProps<ListItemProps, DefaultTheme>>
    | false => props.type === 'nav' && typeNavCSS}
  ${(
    props
  ):
    | FlattenInterpolation<ThemedStyledProps<ListItemProps, DefaultTheme>>
    | false => props.type === 'icon' && typeIconCSS}
  ${(
    props
  ):
    | FlattenInterpolation<ThemedStyledProps<ListItemProps, DefaultTheme>>
    | false => props.type === 'menu' && typeMenuCSS}
`

interface ListItemProps {
  type?: 'nav' | 'icon' | 'menu'
  children: ReactNode
}

export const ListItem: FunctionComponent<ListItemProps> = ({
  type,
  children,
}) => <StyledListItem type={type}>{children}</StyledListItem>
