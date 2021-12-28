import React from 'react'
import { render } from '../testUtils'
import 'jest-styled-components'
import '@testing-library/jest-dom/extend-expect'
import About from '../../src/pages/About'
import { screen } from '@testing-library/react'

describe('About page', () => {
  test('matches text', async () => {
    render(<About />)
    expect(
      screen.getByText(
        'If you are striving for success – try empathy for your users.'
      )
    ).toBeInTheDocument()
  })
})
