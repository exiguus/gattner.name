import React, {
  FunctionComponent,
  ReactElement,
  ReactNode,
  MouseEvent,
} from 'react'
import { LocationDescriptor } from 'history'
import {
  StyledActiveNavLink,
  StyledExternalNavLink,
  StyledNavLink,
} from './styles'

export interface LinkProps {
  children: ReactNode | ReactElement
  to?: string | LocationDescriptor
  href?: string
  title?: string
  exact?: boolean
  lineThrough?: boolean
}

const Link: FunctionComponent<LinkProps> = ({
  children,
  to,
  href,
  title,
  exact = true,
  lineThrough = false,
}) => {
  const isMail = href?.startsWith('mailto:')
  if (isMail) {
    const hrefMail = href?.split('@') || []
    href = `${hrefMail[0]}[at]${hrefMail[1]}`
  }

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
            <StyledActiveNavLink lineThrough={lineThrough} title={title}>
              {children}
            </StyledActiveNavLink>
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
