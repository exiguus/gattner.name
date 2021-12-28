import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { name, title } from '../../../data/site.json'
import { Section } from '../Section'
import { Link } from '../Link'

const StyledHeaderInner = styled.div`
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`

const Brand = styled.h1`
  font-weight: 600;
  padding: 0 0.5rem;
  margin-bottom: 1rem;
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    margin-bottom: 0;
  }
`
const Title = styled.strong`
  display: block;
  font-weight: 300;
`

const Menu = styled.ul`
  padding: 0 0.5rem;
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    padding: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`

const MenuLink = styled.li`
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

const StyledNavLink = styled(Link)`
  font-size: inherit;
  color: ${(props): string => props.theme.link.color};
  text-decoration: none;

  &:hover,
  &:active,
  &:focus {
    text-decoration: underline;
  }
`

const Header: FunctionComponent = () => {
  return (
    <header>
      <Section>
        <StyledHeaderInner>
          <Brand data-testid="brand">
            <StyledNavLink to="/">{name} </StyledNavLink>
            <br />
            <StyledNavLink to="/">
              <Title>{title}</Title>
            </StyledNavLink>
          </Brand>
          <Menu>
            <MenuLink>
              <StyledNavLink to="/">Home</StyledNavLink>
            </MenuLink>
            <MenuLink>
              <StyledNavLink to="/about">About</StyledNavLink>
            </MenuLink>
            <MenuLink>
              <StyledNavLink to="/contact">Contact</StyledNavLink>
            </MenuLink>
          </Menu>
        </StyledHeaderInner>
      </Section>
    </header>
  )
}

export { Header }
