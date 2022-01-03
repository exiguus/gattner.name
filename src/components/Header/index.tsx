import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { HeaderProps } from '../../../schemas'
import { Section } from '../Section'
import { Link } from '../Link'
import { Mark } from '../Mark'
import { List } from '../List'
import { ListItem } from '../ListItem'

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

const StyledNavLink = styled(Link)`
  font-size: inherit;
  text-decoration: none;

  &:hover,
  &:active,
  &:focus {
    text-decoration: underline;
  }
`

const Header: FunctionComponent<HeaderProps> = ({ title, name, menu }) => {
  return (
    <header>
      <Section>
        <StyledHeaderInner>
          <Brand data-testid="brand">
            <StyledNavLink to="/">
              <Mark>{name}</Mark>{' '}
            </StyledNavLink>
            <br />
            <StyledNavLink to="/">
              <Title>
                <Mark>{title}</Mark>
              </Title>
            </StyledNavLink>
          </Brand>
          <List type="nav">
            {menu.list.map(({ title, text, href }, index) => (
              <ListItem type="nav" key={`mli-${index}`}>
                <StyledNavLink to={href} title={title} lineThrough={true}>
                  {text}
                </StyledNavLink>
              </ListItem>
            ))}
          </List>
        </StyledHeaderInner>
      </Section>
    </header>
  )
}

export { Header }
