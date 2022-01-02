import { isPrerender } from './prerender'
const prerender = isPrerender()

function removeStyles(): boolean {
  if (!prerender && process.env.NODE_ENV === 'production')
    document.querySelector('style[data-styled="pre-active"]')?.remove()
  return true
}

function addStyles(): boolean {
  if (prerender) {
    const sheets = document.styleSheets as StyleSheetList
    for (let i = 0; i < sheets.length; i++) {
      const sheet = sheets[i]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const owner = sheet.ownerNode as Element | any
      owner.setAttribute('data-styled', 'pre-active')
      if (!sheet?.href && owner?.innerText === '') {
        const cssText = [].slice
          .call(sheet.cssRules)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .reduce(function (prev, cssRule: any) {
            return prev + cssRule.cssText
          }, '')
        owner.innerHTML = cssText
      }
    }
  }
  return true
}

export { removeStyles, addStyles }
