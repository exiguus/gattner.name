import { waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  addPreloadScripts,
  addPrefetchFonts,
  fixDynamicImportScripts,
} from './head'

// TODO: test all functionality for doublicate appends
const getExampleDocument = (callback: () => void) => {
  const script = document.createElement('script')
  script.setAttribute('src', 'http://localhost:8000/path/file.js')
  document.head.append(script)

  const style = document.createElement('style')
  style.innerText = `
    @font-face {
      font-family: "Open Sans";
      src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),
          url("/fonts/OpenSans-Regular-webfont.woff") format("woff");
    }
  `
  document.head.append(style)

  document.addEventListener('documentContentLoaded', () => {
    document.body.setAttribute('data-document-content-loaded', 'true')
    callback()
  })

  return document
}

describe('head', () => {
  describe('fixDynamicImportScripts', () => {
    test('fix dynamic import script link', async () => {
      const document = getExampleDocument(fixDynamicImportScripts)
      fireEvent(document, new Event('documentContentLoaded'))
      await waitFor(() => {
        expect(document.querySelector('script')?.getAttribute('src')).toEqual(
          '/path/file.js'
        )
      })
    })
  })

  describe('addPreloadScripts', () => {
    test('add preload script link', async () => {
      const document = getExampleDocument(addPreloadScripts)
      fireEvent(document, new Event('documentContentLoaded'))
      await waitFor(() => {
        expect(
          document.querySelector('link[rel="preload"]')?.getAttribute('href')
        ).toEqual('/path/file.js')
      })
    })
  })

  describe('addPrefetchFonts', () => {
    test('add prefetch font link', async () => {
      const document = getExampleDocument(addPrefetchFonts)

      fireEvent(document, new Event('documentContentLoaded'))

      await waitFor(() => {
        expect(
          document.querySelector('link[rel="prefetch"]')?.getAttribute('href')
        ).toEqual('/OpenSans-Regular-webfont.woff2')
      })
    })
  })
})
