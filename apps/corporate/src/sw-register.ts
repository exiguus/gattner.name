import { Workbox } from 'workbox-window'

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
      import('./lib/tracker').then(({ track }) => {
        track({
          type: 'register',
          msg: 'Service Worker registered',
          value: `Service Worker in navigator is registered with scope: ${registration?.scope}"`,
        })
      })
    },
    /*catch*/ error => {
      console.error(`Service worker registration failed: ${error}`)
      import('./lib/tracker').then(({ track }) => {
        track({
          type: 'error',
          msg: 'Service Worker error',
          value: `Service Worker in navigator has error: ${error}"`,
        })
      })
    }
  )
  window.sw.addEventListener('activated', event => {
    import('./lib/tracker').then(({ track, trackBindSendEvent }) => {
      trackBindSendEvent()
      track({
        type: 'activated',
        msg: 'Service Worker activated',
        value: `Service Worker in navigator is activated`,
      })
    })
  })
}
