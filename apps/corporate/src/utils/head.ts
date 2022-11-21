export function fixDynamicImportScripts(): void {
  const scriptNodes: NodeListOf<HTMLScriptElement> =
    document.head.querySelectorAll('script[src^="http://localhost:8000/"]')
  scriptNodes.forEach(scriptNode => {
    const src = scriptNode.getAttribute('src') ?? ''
    scriptNode.setAttribute('src', src.replace('http://localhost:8000/', '/'))
  })

  const homeScriptNodes: NodeListOf<HTMLScriptElement> =
    document.head.querySelectorAll('script[src^="/Home."]')
  if (homeScriptNodes.length === 2) homeScriptNodes[1].remove()
}

export function addPreloadScripts(): void {
  const scriptNodes: NodeListOf<HTMLScriptElement> =
    document.querySelectorAll('script[src$=".js"]')

  scriptNodes.forEach(scriptNode => {
    const src = scriptNode.getAttribute('src')
    const href = `${src?.startsWith('/') ? src : `/${src}`}`
    if (document.querySelector(`link[href="${href}"]`)) return

    const link = document.createElement('link')
    link.rel =
      scriptNode.getAttribute('type') === 'module' ? 'modulepreload' : 'preload'
    link.as = 'script'
    link.href = href
    document.head.append(link)
  })
}

export function addPrefetchFonts(): void {
  const styleNode: HTMLStyleElement | null = document.querySelector('style')
  const fontHrefs =
    styleNode?.innerText?.match(/(\/[A-Za-z0-9-.]*\.woff2)/g) || []

  fontHrefs.forEach(fontHref => {
    if (document.querySelector(`link[href="${fontHref}"]`)) return
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'font'
    link.href = fontHref
    document.head.append(link)
  })
}
