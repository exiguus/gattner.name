import React from 'react'
import { render } from '../testUtils'
import App from '../../src/App'
import app from '../../data/app.json'
import 'jest-styled-components'
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'

describe('App', () => {
  test('matches text', async () => {
    render(<App {...app} />)
    expect(screen.getByText(app.name)).toBeInTheDocument()
    expect(screen.getByText(app.title)).toBeInTheDocument()
  })
})
