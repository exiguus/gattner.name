import React from 'react'
import styled from 'styled-components'
import { SkipNavProps } from '../../../schemas'
import { List } from '../List'
import { ListItem } from '../ListItem'
import { useTranslate } from '../../hooks/useTranslate'

const StyledLink = styled.a`
  display: block;
  margin: -1px;
  padding: 0;
  height: 1px;
  width: 1px;
  font-size: 0.8rem;
  border: 0;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
  transition: padding 0s;

  &:focus {
    position: relative;
    top: 4rem;
    left: 55%;
    padding: 0.5rem;
    width: 40%;
    height: auto;
    overflow: initial;
  }
`

export const SkipNav = ({ nav }: SkipNavProps) => {
  const { t } = useTranslate()
  return (
    <nav
      aria-label={t('a11y.skipNav.label')}
      aria-live="off"
      aria-atomic="false"
      data-testid="skip-nav"
    >
      <List>
        {nav.list.map(({ id, text, title, href }) => (
          <ListItem key={id}>
            <StyledLink
              title={title}
              href={href}
              data-testid={`skip-nav-${id}`}
              tabIndex={0}
            >
              {text}
            </StyledLink>
          </ListItem>
        ))}
      </List>
    </nav>
  )
}
