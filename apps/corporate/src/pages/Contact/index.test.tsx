import React from 'react'
import { render, screen } from '../../../tests/testUtils'
import Contact from '.'
import contact from '../../../data/content/contact.json'

describe('Contact Page', () => {
  Object.entries(contact).forEach(([key, value]) => {
    test(`${key} text match`, async () => {
      render(<Contact {...contact} />)
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
