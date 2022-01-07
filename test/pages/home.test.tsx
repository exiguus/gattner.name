import React from 'react'
import { render } from '../testUtils'
import Home from '../../src/pages/Home'
import home from '../../data/content/home.json'
import 'jest-styled-components'
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'

describe('Home page', () => {
  test('matches text', async () => {
    render(<Home {...home} />)
    expect(screen.getByTestId('slogan')).toBeDefined()
    const screenText = (
      screen.getByTestId('slogan').textContent ?? 'no text content'
    ).replace(/ /g, '')

    const text = home.content.find(
      text => text.replace(/ /g, '') === screenText
    )
    expect(screenText).toEqual((text ?? 'text not matched').replace(/ /g, ''))
  })
})
