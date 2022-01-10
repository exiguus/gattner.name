declare global {
  interface Window {
    __PRERENDER?: boolean
  }
}

const isPrerender = (): boolean => !!window['__PRERENDER']

export { isPrerender }
