export function addStyledComponentStyles(): void {
  const styleSheetList: StyleSheetList = document.styleSheets
  // https://developer.mozilla.org/en-US/docs/Web/API/StyleSheetList
  // const styleSheetList: StyleSheetList = document.styleSheets
  Array.from(styleSheetList).forEach(cssStyleSheet => {
    // Owners are: HTMLLinkElement, HTMLStyleElement, or SVGStyleElement
    //  but sheet.ownerNode has the type: Element | ProcessingInstruction | null
    //  see: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
    // https://developer.mozilla.org/en-US/docs/Web/API/StyleSheet/ownerNode
    const owner = cssStyleSheet.ownerNode ?? document.querySelector('style')
    if (owner != null && 'setAttribute' in owner) {
      owner.setAttribute('data-styled', 'pre-active')
    }
    if (
      !cssStyleSheet?.href &&
      owner != null &&
      'innerHTML' in owner &&
      owner?.innerHTML === ''
    ) {
      const cssText = Array.from(cssStyleSheet.cssRules).reduce(
        (prev: string, { cssText }): string => `${prev}${cssText}`,
        ''
      )
      owner.innerHTML = cssText
    }
  })
}
