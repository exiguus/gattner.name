import { Workbox } from 'workbox-window'
declare global {
  interface Window {
    sw: Record<string, Workbox>
  }
}

export const getTrack = async () => {
  if ('serviceWorker' in navigator) {
    window.sw = window.sw || {}
    window.sw.lastfm = new Workbox('/sw-lastfm.js')

    window.sw.lastfm.register()
    return await window.sw.lastfm.messageSW({ type: 'GET_TRACK' })
  } else {
    return {
      error: new Error('Service Worker not registered'),
      data: 'Service worker is not available',
    }
  }
}
