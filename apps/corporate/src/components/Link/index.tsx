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
  dataTestId?: string
  lineThrough?: boolean
}

const Link: FunctionComponent<LinkProps> = ({
  children,
  to,
  href,
  title,
  dataTestId,
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

    import('../../lib/tracker').then(({ track }) => {
      track({
        type: 'click',
        msg: 'Link clicked',
        value: `Link clicked with href "${href}" and isMail "${isMail}"`,
      })
    })

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
          data-testid={dataTestId}
        >
          {children}
        </StyledExternalNavLink>
      )}
      {to && !href && (
        <>
          {window.location.pathname === to ||
          window.location.pathname === to + '/' ? (
            <StyledActiveNavLink
              data-testid={dataTestId}
              lineThrough={lineThrough}
              title={title}
              onClickCapture={() =>
                import('../../lib/tracker').then(({ track }) => {
                  track({
                    type: 'click',
                    msg: 'Link clicked',
                    value: `Link clicked with to "${to}" and "${title}"`,
                  })
                })
              }
            >
              {children}
            </StyledActiveNavLink>
          ) : (
            <StyledNavLink
              data-testid={dataTestId}
              to={to}
              title={title}
              exact={exact}
              onClickCapture={() =>
                import('../../lib/tracker').then(({ track }) => {
                  track({
                    type: 'click',
                    msg: 'Link clicked',
                    value: `Link clicked with to "${to}" and "${title}"`,
                  })
                })
              }
            >
              {children}
            </StyledNavLink>
          )}
        </>
      )}
    </>
  )
}
export { Link }
