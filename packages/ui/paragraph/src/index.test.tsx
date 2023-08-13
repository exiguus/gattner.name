import React from 'react'
import '@gattner/test-utils'
import { render, screen, waitFor } from '@gattner/test-utils'
import { Paragraph } from '.'

jest.mock('randext', () => {
  return jest.fn().mockImplementation(() => {
    return {
      start: jest.fn(),
      stop: jest.fn(),
    }
  })
})

describe('Paragraph Component', () => {
  test('matches text', async () => {
    render(<Paragraph text="test string" />)
    expect(screen.getByText('test string')).toBeInTheDocument()
  })

  test('matches child text', async () => {
    render(<Paragraph>test string</Paragraph>)
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
