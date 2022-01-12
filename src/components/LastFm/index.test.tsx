import React from 'react'
import { render, waitFor, screen } from '../../../test/testUtils'
import { LastFm } from '.'

describe('LastFm Component', () => {
  test('matches text', async () => {
    render(
      <>
        {process.env.LAST_FM_API_KEY && process.env.LAST_FM_USER_NAME && (
          <LastFm
            userName={process.env.LAST_FM_USER_NAME}
            apiKey={process.env.LAST_FM_API_KEY}
          />
        )}
      </>
    )

    await waitFor(() => {
      expect(screen.getByTestId('lastfm')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByTestId('lastfm-listen')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByTestId('lastfm-listen').textContent).toBe(
        'Marie by Milliarden'
      )
    })
  })
})
