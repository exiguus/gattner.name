import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import { isTouch } from '@gattner/utils'
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
  font-size: 1.2em;
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
  font-size: 0.8em;
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
  const isTouchDevice = isTouch()
  const history = useHistory()
  const currentMenuIndex = menu.list.findIndex(
    ({ href }) => href === history.location.pathname
  )
  let historyTimeout: ReturnType<typeof setTimeout>
  const [changeHistory, setChangeHistory] = useState(false)

  console.log({ history, menu, currentMenuIndex })
  const { ref: documentRef } = useSwipeable({
    onSwiped: ({ dir, event }) => {
      if (dir === 'Left') {
        console.log('swiped left', event)
        const nextMenuIndex = currentMenuIndex + 1
        const nextMenuHref = menu.list[nextMenuIndex]?.href || '/'
        if (history.location.pathname !== nextMenuHref) {
          historyTimeout = setTimeout(() => {
            if (!changeHistory) {
              history.push(nextMenuHref)
              setChangeHistory(true)
              console.log({ h: history.location, w: window.location })
            }
          }, 0)
        }
      } else if (dir === 'Right') {
        console.log('swiped right', event)
        const prevMenuIndex = currentMenuIndex - 1
        const prevMenuHref = menu.list[prevMenuIndex]?.href || '/contact'
        if (history.location.pathname !== prevMenuHref) {
          historyTimeout = setTimeout(() => {
            if (!changeHistory) {
              history.push(prevMenuHref)
              setChangeHistory(true)
              console.log({ h: history.location, w: window.location })
            }
          }, 0)
        }
      }
    },
    onSwiping: ({ event }) => event.stopPropagation(),
    preventScrollOnSwipe: true,
    delta: 50,
  })

  useEffect(() => {
    if (!isTouchDevice) return
    documentRef(document as unknown as HTMLElement)
    return () => {
      clearTimeout(historyTimeout)
      documentRef(null)
    }
  })

  return (
    <header>
      <Section>
        <StyledHeaderInner>
          <Brand data-testid="brand">
            <StyledNavLink to="/" dataTestId="brand-name">
              <Mark>{name}</Mark>{' '}
            </StyledNavLink>
            <br />
            <StyledNavLink to="/" dataTestId="brand-title">
              <Title>
                <Mark>{title}</Mark>
              </Title>
            </StyledNavLink>
          </Brand>
          <List type="nav">
            {menu.list.map(({ id, title, text, href }) => (
              <ListItem type="nav" key={`header-mli-${id}`}>
                <StyledNavLink
                  dataTestId={`header-nav-link-${id}`}
                  to={href}
                  title={title}
                  lineThrough={true}
                >
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
