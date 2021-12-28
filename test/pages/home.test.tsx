import React from 'react'
import { render } from '../testUtils'
import Home from '../../src/pages/About'
import 'jest-styled-components'
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'

describe('Home page', () => {
  test('matches text', async () => {
    render(<Home />)
    expect(screen.getByTestId('brand').textContent).toBe(
      'Simon Gattner Senior Frontend Developer'
    )
  })
})
