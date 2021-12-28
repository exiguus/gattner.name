import { isServer } from './ssr'
const ssr = isServer()

function preHeadLinkScripts(): boolean {
  if (ssr) {
    const scriptNodes = document.querySelectorAll('script[src$=".js"]')
    scriptNodes.forEach(scriptNode => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'script'
      link.href = `/${scriptNode.getAttribute('src')?.split('/')[1]}` || ''
      document.head.append(link)
    })
  }
  return true
}

function preHeadLinkFonts(): boolean {
  if (ssr) {
    const styleNode = document.querySelector('style')
    const fontHrefs =
      styleNode?.innerText.match(/(\/[A-Za-z0-9-.]*\.woff2)/g) || []
    fontHrefs.forEach(fontHref => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.as = 'font'
      link.href = fontHref
      document.head.append(link)
    })
  }
  return true
}

export { preHeadLinkFonts, preHeadLinkScripts }
