declare global {
  interface Window {
    __SSR: boolean
  }
}

const isServer = (): boolean => window['__SSR'] || false

export { isServer }
