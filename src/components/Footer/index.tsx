import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
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
          {process.env.LAST_FM_API_KEY && process.env.LAST_FM_USER_NAME && (
            <LastFm
              userName={process.env.LAST_FM_USER_NAME}
              apiKey={process.env.LAST_FM_API_KEY}
            />
          )}
        </StyledFooterInner>
      </Section>
    </footer>
  )
}

export { Footer }
