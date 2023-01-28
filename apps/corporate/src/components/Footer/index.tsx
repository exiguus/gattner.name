import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import useNetwork from '../../hooks/useNetwork'
import { isPrerender } from '../../utils/prerender'
import { FooterProps } from '../../../schemas'
import { Section } from '../Section'
import { Link } from '../Link'
import { List } from '../List'
import { ListItem } from '../ListItem'
import { LastFm } from '../LastFm'
import { Icon } from '../Icon'

const StyledFooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Footer: FunctionComponent<FooterProps> = ({ nav, menu }) => {
  const [showLastFm, setShowLastFm] = useState<boolean>(false)
  const { online, connection } = useNetwork()
  const hasConnection =
    connection.effectiveType !== 'slow-2g' &&
    connection.effectiveType !== '2g' &&
    online &&
    !isPrerender()

  useEffect(() => {
    if (hasConnection) {
      setShowLastFm(true)
      import('../../lib/tracker').then(({ track }) => {
        track({
          type: 'animate',
          msg: 'LastFm animated',
          value: `LastFm animated with connection "${connection.effectiveType}"`,
        })
      })
    }
  }, [hasConnection])

  return (
    <footer>
      <Section>
        <StyledFooterInner>
          {nav.list && (
            <List type="footer">
              {nav.list.map(({ id, href, title, icon }) => (
                <ListItem type="icon" key={`fnli-${id}`}>
                  <Link
                    dataTestId={`footer-nav-link-${id}`}
                    href={href}
                    title={title}
                  >
                    <Icon type={icon} />
                  </Link>
                </ListItem>
              ))}
            </List>
          )}
          <List type="menu">
            {menu.list.map(({ id, href, title, text }) => (
              <ListItem key={`fmli-${id}`} type="menu">
                <Link
                  dataTestId={`footer-menu-link-${id}`}
                  to={href}
                  title={title}
                  lineThrough={true}
                >
                  {text}
                </Link>
              </ListItem>
            ))}
          </List>
          {showLastFm && <LastFm />}
        </StyledFooterInner>
      </Section>
    </footer>
  )
}

export { Footer }
