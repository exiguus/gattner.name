import React from 'react'
import { render, screen } from '../../../tests/testUtils'
import About from '.'
import about from '../../../data/content/about.json'

describe('About Page', () => {
  Object.entries(about).forEach(([key, value]) => {
    test(`${key} text match`, async () => {
      render(<About {...about} />)
      if (typeof value === 'string') {
        expect(screen.getByText(value)).toBeInTheDocument()
      }
      if (Array.isArray(value)) {
        value.forEach(v => {
          expect(screen.getByText(v)).toBeInTheDocument()
        })
      }
    })
  })
})
