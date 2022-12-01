import { Workbox } from 'workbox-window'
import { track, trackBindSendEvent } from './lib/tracker'

declare global {
  interface Window {
    sw: Workbox
    swUtils: Record<string, unknown>
  }
}
export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) return
  window.sw = window.sw || null
  window.sw = new Workbox('/sw.js')
  window.sw.register().then(
    registration => {
      track({
        type: 'register',
        msg: 'Service Worker registered',
        value: `Service Worker in navigator is "${registration}"`,
      })
    },
    /*catch*/ error => {
      console.error(`Service worker registration failed: ${error}`)
    }
  )
  window.sw.addEventListener('activated', event => {
    trackBindSendEvent()
    track({
      type: 'activated',
      msg: 'Service Worker activated',
      value: `Service Worker in navigator is activated`,
    })
  })
}
