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
      <LastFm userName="exiguus_" apiKey="98a2e5544a139a5675d1a85b8126f0f7" />
    )

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1))

    // TODO: there is no user handle to waitFor and jest throw a act(...) console.error
    setTimeout(async () => {
      expect(screen.getByTestId('lastfm-listen').textContent).toBe(
        'Marie by Milliarden'
      )
    }, 3000)
  })
})
