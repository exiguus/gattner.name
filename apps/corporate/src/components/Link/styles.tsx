import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

export const StyleNavLink = css`
  display: inline-block;
  font-size: inherit;
  line-height: inherit;
  height: inherit;
  text-decoration: none;
  overflow: hidden;

  svg {
    padding: 0.5em;
    height: 1.5em;
  }
`

export const StyledNavLink = styled(NavLink)`
  ${StyleNavLink}
  position: relative;

  ::before {
    will-change: transform;
    position: absolute;
    content: '';
    display: block;
    height: 2px;
    width: 100%;
    transform: translateX(-101%);
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

export const StyledExternalNavLink = styled.a`
  ${StyleNavLink}

  &:hover,
  &:active,
  &:focus {
    text-decoration: underline;
  }
`

export const StyledActiveNavLink = styled.span<{ lineThrough: boolean }>`
  ${StyleNavLink}
  font-weight: 600;
  ${({ lineThrough }): string =>
    lineThrough ? `text-decoration: line-through;` : ''}
`
