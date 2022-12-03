export function fixDynamicImportScripts(): void {
  removeDoublicateScripts()
  const scriptNodes: NodeListOf<HTMLScriptElement> =
    document.head.querySelectorAll('script[src^="http://localhost:8000/"]')

  scriptNodes.forEach(scriptNode => {
    const src = scriptNode.getAttribute('src') ?? ''
    scriptNode.setAttribute('src', src.replace('http://localhost:8000/', '/'))
  })
}

export const removeDoublicateScripts = (): void => {
  const scriptNodes: NodeListOf<HTMLScriptElement> =
    document.head.querySelectorAll('script[src]')
  const scriptNodeSources = Array.from(scriptNodes).map(({ src }) => src)
  const scriptNodeSourceDoublicates = scriptNodeSources.filter(
    (item, index) => scriptNodeSources.indexOf(item) !== index
  )

  scriptNodeSourceDoublicates.forEach(scriptNodeSourceDoublicate => {
    const scripts: NodeListOf<HTMLScriptElement> =
      document.head.querySelectorAll(
        `script[src^="${scriptNodeSourceDoublicate}"]`
      )
    if (scripts.length > 1) {
      scripts.forEach((script, index) => {
        if (index > 0) {
          script.remove()
        }
      })
    }
  })
  // remove prerender scripts
  scriptNodes.forEach(scriptNode => {
    if (scriptNode.src.match(/(head|styles).*\.js$/)) {
      scriptNode.remove()
    }
  })
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
