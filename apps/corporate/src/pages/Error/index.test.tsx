import React from 'react'
import { render, screen } from '../../../test/testUtils'
import Error from '.'
import error from '../../../data/content/error.json'

describe('Error Page', () => {
  Object.entries(error).forEach(([key, value]) => {
    test(`${key} text match`, async () => {
      render(<Error {...error} />)
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
