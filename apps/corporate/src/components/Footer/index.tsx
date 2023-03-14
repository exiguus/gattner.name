import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslate } from '../../hooks/useTranslate'
import { FooterProps } from '../../../schemas'
import { Container } from '../Container'
import { Link } from '../Link'
import { List } from '../List'
import { ListItem } from '../ListItem'
import { Icon } from '../Icon'
import { SrOnly } from '../SrOnly'

const StyledFooterNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Footer: FunctionComponent<FooterProps> = ({ nav, menu }) => {
  const { t } = useTranslate()

  return (
    <footer id="footer">
      <Container>
        <StyledFooterNav aria-label={t('a11y.footer.nav.label')}>
          {nav.list && (
            <List
              type="footer"
              aria-label={t('a11y.footer.quicklinklist.label')}
            >
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
          <List type="menu" aria-label={t('a11y.footer.servicelinklist.label')}>
            {menu.list.map(({ id, href, title, text, srOnly }) =>
              srOnly ? (
                <SrOnly asHtml="li" key={`fmli-sronly-${id}`}>
                  <Link
                    dataTestId={`footer-menu-link-${id}`}
                    to={href}
                    title={title}
                    lineThrough={true}
                    srOnly={srOnly}
                  >
                    {text}
                  </Link>
                </SrOnly>
              ) : (
                <ListItem key={`fmli-${id}`} type="menu">
                  <Link
                    dataTestId={`footer-menu-link-${id}`}
                    to={href}
                    title={title}
                    lineThrough={true}
                    srOnly={srOnly}
                  >
                    {text}
                  </Link>
                </ListItem>
              )
            )}
          </List>
        </StyledFooterNav>
      </Container>
    </footer>
  )
}

export { Footer }
