import React, {
  FunctionComponent,
  ReactElement,
  ReactNode,
  MouseEvent,
} from 'react'
import { NavLink } from 'react-router-dom'
import { LocationDescriptor } from 'history'
import styled, { css } from 'styled-components'

const StyleNavLink = css`
  display: inline-block;
  font-size: inherit;
  color: ${(props): string => props.theme.link.color};
  text-decoration: none;
  overflow: hidden;

  svg {
    padding: 0.5em;
    height: 1.5em;
  }

  &:hover svg,
  &:active svg,
  &:focus svg {
    fill: ${(props): string => props.theme.link.hoverColor};
  }
`
const StyledNavLink = styled(NavLink)`
  ${StyleNavLink}
  position: relative;

  ::before {
    position: absolute;
    content: '';
    display: block;
    height: 2px;
    width: 100%;
    background-color: ${(props): string => props.theme.link.color};
    transform: translateX(-100%);
    overflow: hidden;
  }

  &:hover {
    text-decoration: underline;
  }

  &:focus,
  &:active {
    &::before {
      transform: translateX(0);
      transition: 4.2s ease-out 0.4s;
    }
  }
`

const StyledExternalNavLink = styled.a`
  ${StyleNavLink}
  &:hover,
  &:active,
  &:focus {
    text-decoration: underline;
  }
`

const StyledActiveNavLink = styled.span`
  ${StyleNavLink}
  font-weight: 600;
`

const handleClick = (event: MouseEvent<HTMLAnchorElement>): boolean => {
  let href = event.currentTarget?.href || ''
  const isMail = href?.startsWith('mailto:')
  if (isMail) {
    event.preventDefault()
    href = href.replace(/(.*)\[at\](.*)/i, '$1@$2')
    window.open(href)
  }
  return true
}

interface LinkProps {
  children: ReactNode | ReactElement
  to?: string | LocationDescriptor
  href?: string
  title?: string
  exact?: boolean
}

const Link: FunctionComponent<LinkProps> = ({
  children,
  to,
  href,
  title,
  exact = true,
}) => {
  const isMail = href?.startsWith('mailto:')
  if (isMail) {
    const hrefMail = href?.split('@') || []
    href = `${hrefMail[0]}[at]${hrefMail[1]}`
  }
  return (
    <>
      {href && !to && (
        <StyledExternalNavLink
          onClickCapture={handleClick}
          href={href}
          title={title}
        >
          {children}
        </StyledExternalNavLink>
      )}
      {to && !href && (
        <>
          {window.location.pathname === to ||
          window.location.pathname === to + '/' ? (
            <StyledActiveNavLink title={title}>{children}</StyledActiveNavLink>
          ) : (
            <StyledNavLink to={to} title={title} exact={exact}>
              {children}
            </StyledNavLink>
          )}
        </>
      )}
    </>
  )
}
export { Link }
