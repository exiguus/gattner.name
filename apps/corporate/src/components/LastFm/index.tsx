import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useLastFm } from '../../hooks/useLastFm'

const StyledLastFm = styled.aside`
  will-change: transform;
  position: fixed;
  bottom: 3.5rem;
  right: -1rem;
  height: 1rem;
  width: 1rem;
  font-size: 80%;
  transform: rotate(90deg);
  overflow: visible;

  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    bottom: -0.5rem;
  }

  strong {
    font-weight: 600;
  }
`

const StyledLastFmInner = styled.span`
  position: relative;
  top: 1rem;
  left: -90vh;
  display: block;
  height: 2rem;
  width: 90vh;
  text-align: right;
`

const LastFm: FunctionComponent = () => {
  const { isPending, hasUserRecenttrack, userRecenttrack } = useLastFm()
  return isPending ? (
    <StyledLastFm data-testid="lastfm">
      <StyledLastFmInner>Updating...</StyledLastFmInner>
    </StyledLastFm>
  ) : hasUserRecenttrack ? (
    <StyledLastFm data-testid="lastfm">
      <StyledLastFmInner>
        Listen to{' '}
        <strong>
          <span data-testid="lastfm-listen">{userRecenttrack}</span>
        </strong>
      </StyledLastFmInner>
    </StyledLastFm>
  ) : null
}

export { LastFm }
