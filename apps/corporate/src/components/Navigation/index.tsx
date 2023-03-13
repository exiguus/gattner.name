import React from 'react'
import { useTranslate } from '../../hooks/useTranslate'
import styled from 'styled-components'
import { Link as LinkProps } from '../../../schemas'
import { Link } from '../Link'
import { List } from '../List'
import { ListItem } from '../ListItem'
import { Swipeable } from './components/Swipeable'

const StyledNavLink = styled(Link)`
  font-size: inherit;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    text-decoration: underline;
  }
`

const Navigation = ({ items }: { items: Array<LinkProps> }) => {
  const { t } = useTranslate()
  return (
    <Swipeable items={items}>
      <nav aria-label={t('a11y.mainNav.label')} id="main-nav">
        <List type="nav">
          {items.map(({ id, title, text, href }) => (
            <ListItem type="nav" key={`navigation-mli-${id}`}>
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
      </nav>
    </Swipeable>
  )
}

export { Navigation }
