import { waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  addPreloadScripts,
  addPrefetchFonts,
  removeDynamicImportScripts,
} from './head'

// TODO: test all functionality for doublicate appends
const getExampleDocument = (callback: () => void) => {
  const script = document.createElement('script')
  script.setAttribute('src', '/path/file.js')
  document.head.append(script)
  document.body.append(script)

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
  describe('removeDynamicImportScripts', () => {
    test('remove dynamic import script link', async () => {
      const document = getExampleDocument(removeDynamicImportScripts)
      fireEvent(document, new Event('documentContentLoaded'))
      await waitFor(() => {
        expect(document.head.querySelectorAll('script').length).toEqual(0)
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
