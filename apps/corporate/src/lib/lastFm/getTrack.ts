import { UserRecenttracks } from 'schemas/lastFm'
import { FetchResult } from 'src/utils/fetch'
import { Workbox } from 'workbox-window'
declare global {
  interface Window {
    sw: Record<string, Workbox>
  }
}

export const getTrack = async (): Promise<FetchResult<UserRecenttracks>> => {
  if ('serviceWorker' in navigator) {
    window.sw = window.sw || {}
    window.sw.lastfm = new Workbox('/sw-lastfm.js')

    window.sw.lastfm.register()
    return await window.sw.lastfm.messageSW({ type: 'GET_TRACK' })
  } else {
    return await {
      result: 'request-failed',
      error: new Error('Service Worker not found'),
    }
  }
}
