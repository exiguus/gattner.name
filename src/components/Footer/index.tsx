import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { footer } from '../../../data/site.json'
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

const Footer: FunctionComponent = () => {
  return (
    <footer>
      <Section>
        <StyledFooterInner>
          {footer.nav.list && (
            <List type="footer">
              {footer.nav.list.map(({ href, title, icon }, index) => (
                <ListItem type="icon" key={index}>
                  <Link href={href} title={title}>
                    <Icon type={icon} />
                  </Link>
                </ListItem>
              ))}
            </List>
          )}
          <List type="menu">
            <ListItem type="menu">
              <Link to="/impressum" lineThrough={true}>
                Impressum
              </Link>
            </ListItem>
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
