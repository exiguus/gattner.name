import { isServer } from './ssr'
const ssr = isServer()

function removeStyles(): boolean {
  if (!ssr && process.env.NODE_ENV === 'production')
    document.querySelector('style[data-styled="pre-active"]')?.remove()
  return true
}
function addStyles(): boolean {
  if (ssr) {
    const sheets = document.styleSheets as StyleSheetList
    for (let i = 0; i < sheets.length; i++) {
      const sheet = sheets[i]
      const owner = sheet.ownerNode as Element | any
      owner.setAttribute('data-styled', 'pre-active')
      if (!sheet?.href && owner?.innerText === '') {
        const cssText = [].slice
          .call(sheet.cssRules)
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
