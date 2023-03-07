import React from 'react'
import { render, screen } from '../../../tests/testUtils'
import Impressum from '.'
import impressum from '../../../data/content/impressum.json'

describe('Impressum Page', () => {
  Object.entries(impressum).forEach(([key, value]) => {
    test(`${key} text match`, async () => {
      render(<Impressum {...impressum} />)
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
