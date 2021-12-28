import React from 'react'
import { render } from '../testUtils'
import { Paragraph } from '../../src/components/Paragraph'
import 'jest-styled-components'
import '@testing-library/jest-dom/extend-expect'
import { waitFor, screen } from '@testing-library/react'

describe('Paragraph Component', () => {
  test('matches text', async () => {
    render(<Paragraph text="test string" />)
    expect(screen.getByText('test string')).toBeInTheDocument()
  })

  test('matches animate text', async () => {
    const text = 'test string'
    const words = text.split(' ')
    render(<Paragraph text={text} animate={true} />)
    await waitFor(() => screen.getAllByTestId('randext'))
    expect(screen.getAllByTestId('randext').length).toBe(words.length)
    expect(screen.getByText(words[0])).toBeInTheDocument()
    expect(screen.getByText(words[words.length - 1])).toBeInTheDocument()
  })
})
