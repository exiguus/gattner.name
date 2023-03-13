import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useLastFm } from '../../hooks/useLastFm'
import { useTranslate } from '../../hooks/useTranslate'

const StyledLastFm = styled.div`
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

const StyledLastFmInner = styled.p`
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
  const { t } = useTranslate()
  return isPending ? (
    <StyledLastFm data-testid="lastfm">
      <StyledLastFmInner
        role="alert"
        aria-busy="true"
        aria-label={t('a11y.lastfm.label')}
      >
        Updating...
      </StyledLastFmInner>
    </StyledLastFm>
  ) : hasUserRecenttrack ? (
    <StyledLastFm data-testid="lastfm">
      <StyledLastFmInner
        role="alert"
        aria-busy="false"
        aria-label={t('a11y.lastfm.label')}
      >
        {t('lastfm.listen.to')}
        <strong>
          <span data-testid="lastfm-listen">{userRecenttrack}</span>
        </strong>
      </StyledLastFmInner>
    </StyledLastFm>
  ) : null
}

export { LastFm }
