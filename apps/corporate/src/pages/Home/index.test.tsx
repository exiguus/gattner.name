import React from 'react'
import { render, screen } from '../../../tests/testUtils'
import Home from '.'
import home from '../../../data/content/home.json'

describe('Home Page', () => {
  Object.entries(home).forEach(([key, value]) => {
    test(`${key} text match`, async () => {
      render(<Home {...home} />)
      if (typeof value === 'string') {
        expect(screen.getByText(value)).toBeInTheDocument()
      }
      if (Array.isArray(value)) {
        if (key === 'content') {
          expect(
            value
              .map(v => v.replace(/\s/g, ''))
              .includes(screen.getByTestId('slogan').textContent ?? '')
          ).toBe(true)
        } else {
          value.forEach(v => {
            expect(screen.getByText(v)).toBeInTheDocument()
          })
        }
      }
    })
  })
})
