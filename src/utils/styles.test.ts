import { waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { addStyledComponentStyles } from './styles'

const getExampleDocument = () => {
  const style = document.createElement('style')
  style.innerHTML = `
  body {
      color: #333;
      background-color: #CCC;
      font-family: sans-serif;
      font-size: 16px;
    }

    h1 {
      font-size: 2em;
      line-height: 1.23em;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1em;
      line-height: 1.23em;
      font-weight: normal;
    }
  `
  document.head.appendChild(style)

  document.addEventListener('DOMContentLoaded', async () => {
    const styleElement = document.querySelector('style')

    const cssRuleList = document.styleSheets[0].cssRules

    if (styleElement) {
      styleElement.innerHTML = ''
    }

    const stylesheet = document.styleSheets[0]

    Array.from(cssRuleList).forEach(cssRule => {
      stylesheet.insertRule(cssRule.cssText)
    })

    stylesheet.insertRule(
      `
      h2 {
        font-size: 4em;
      }
    `
    )

    stylesheet.insertRule(
      `
      h3 {
        font-size: 2.5em;
      }
    `
    )

    addStyledComponentStyles()
  })

  return document
}

describe('head', () => {
  test('addStyledComponentStyles', async () => {
    const document = getExampleDocument()

    fireEvent(document, new Event('DOMContentLoaded'))

    await waitFor(() => {
      expect(
        document.querySelector('style')?.getAttribute('data-styled')
      ).toEqual('pre-active')
      expect(document.querySelector('style')?.innerHTML).toEqual(
        'h3 {font-size: 2.5em;}h2 {font-size: 4em;}p {font-size: 1em; line-height: 1.23em; font-weight: normal;}h1 {font-size: 2em; line-height: 1.23em; margin-bottom: 1rem;}body {color: #333; background-color: #CCC; font-family: sans-serif; font-size: 16px;}'
      )
    })
  })
})
