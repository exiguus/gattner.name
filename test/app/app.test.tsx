import React from 'react'
import { render } from '../testUtils'
import App from '../../src/App'
import app from '../../data/content/app.json'
import page from '../../data/content/page.json'
import 'jest-styled-components'
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'

describe('App', () => {
  test('matches text', async () => {
    render(<App {...app} />)
    expect(screen.getByText(page.header.name)).toBeInTheDocument()
    expect(screen.getByText(page.header.title)).toBeInTheDocument()
  })
})
