import React from 'react'
import { render, screen, waitFor } from '../test/testUtils'
import App from './App'
import app from '../data/content/app.json'

describe('App', () => {
  test('navigate with links', async () => {
    render(<App {...app} />)

    expect(screen.getByTestId('page-home')).toBeInTheDocument()

    screen.getByTestId('header-nav-link-about').click()
    await waitFor(() =>
      expect(screen.getByTestId('page-about')).toBeInTheDocument()
    )

    screen.getByTestId('header-nav-link-contact').click()
    await waitFor(() =>
      expect(screen.getByTestId('page-contact')).toBeInTheDocument()
    )

    screen.getByTestId('footer-menu-link-impressum').click()
    await waitFor(() =>
      expect(screen.getByTestId('page-impressum')).toBeInTheDocument()
    )
  })
})
