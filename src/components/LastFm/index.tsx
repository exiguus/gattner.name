import React, { useState, useEffect, FunctionComponent } from 'react'
import { isPrerender } from '../../utils/prerender'
import styled from 'styled-components'
import useNetwork from '../../hooks/useNetwork'

// TODO: write a provider and normalize data

const StyledLastFm = styled.aside`
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

interface LastFmProps {
  userName: string
  apiKey: string
}

const LastFm: FunctionComponent<LastFmProps> = ({ userName, apiKey }) => {
  const initialLastFmData = {
    artistName: 'Muse',
    songName: 'Butterflies and Hurricanes',
  }
  const { online, connection } = useNetwork()
  const [isPending, setIsPending] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const [lastFmData, setLastFmData] = useState(initialLastFmData)

  useEffect(() => {
    if (
      connection.effectiveType !== 'slow-2g' &&
      connection.effectiveType !== '2g' &&
      online
    ) {
      fetch(
        `${process.env.LAST_FM_API_HOST}/2.0/?method=user.getRecentTracks&user=${userName}&api_key=${apiKey}&limit=1&nowplaying=true&format=json`
      )
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(`${response.status} ${response.statusText}`)
          }
        })
        .then(data => {
          setIsPending(false)
          if (data?.recenttracks?.track[0]) {
            setLastFmData({
              artistName:
                data.recenttracks.track[0]?.artist['#text'] ||
                initialLastFmData.artistName,
              songName:
                data.recenttracks.track[0]?.name || initialLastFmData.songName,
            })
          }
        })
        .catch(error => setFetchError(error.message))
    } else {
      setIsPending(false)
    }
  }, [
    apiKey,
    connection,
    initialLastFmData.artistName,
    initialLastFmData.songName,
    online,
    userName,
  ])

  const prerender = isPrerender()
  return (
    <StyledLastFm data-testid="lastfm">
      <StyledLastFmInner>
        {!isPending && !prerender && `Listen to `}
        <strong>
          {isPending &&
            prerender &&
            `${lastFmData.songName} by ${lastFmData.artistName}`}
          {isPending && !prerender && fetchError.length === 0 && 'Updating...'}
          {!isPending && !prerender && (
            <span data-testid="lastfm-listen">
              {lastFmData.songName} by {lastFmData.artistName}
            </span>
          )}
        </strong>
      </StyledLastFmInner>
    </StyledLastFm>
  )
}

export { LastFm }
