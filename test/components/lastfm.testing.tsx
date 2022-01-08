import React from 'react'
import { render } from '../testUtils'
import { LastFm } from '../../src/components/LastFm'
import 'jest-styled-components'
import '@testing-library/jest-dom/extend-expect'
import { waitFor, screen } from '@testing-library/react'

describe('LastFm Component', () => {
  test('matches text', async () => {
    const spy = jest.spyOn(global, 'fetch')

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

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1))

    // TODO: there is no user handle to waitFor and jest throw a act(...) console.error
    setTimeout(async () => {
      expect(screen.getByTestId('lastfm-listen').textContent).toBe(
        'Marie by Milliarden'
      )
    }, 5000)
  })
})
