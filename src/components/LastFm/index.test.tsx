import React from 'react'
import { render, waitFor, screen } from '../../../test/testUtils'
import { LastFm } from '.'
import { MockLastFmContextProvider } from '../../providers/lastFm'

describe('LastFm Component', () => {
  test('hasRecenttrack', async () => {
    const userRecenttrack = "The Cure - Friday I'm In Love"
    render(
      <MockLastFmContextProvider
        isPending={false}
        hasUserRecenttrack={true}
        userRecenttrack={userRecenttrack}
      >
        <LastFm />
      </MockLastFmContextProvider>
    )

    expect(screen.getByTestId('lastfm')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByTestId('lastfm-listen')).toBeInTheDocument()
      expect(screen.getByTestId('lastfm-listen').textContent).toEqual(
        userRecenttrack
      )
    })
  })

  test('isPending', async () => {
    render(
      <MockLastFmContextProvider
        isPending={true}
        hasUserRecenttrack={false}
        userRecenttrack={undefined}
      >
        <LastFm />
      </MockLastFmContextProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('lastfm')).toBeInTheDocument()
      expect(screen.getByText('Updating...')).toBeInTheDocument()
    })
  })
})
