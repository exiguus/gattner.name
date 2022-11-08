// self refers to ServiceWorkerGlobalScope instead of window

import { getUserRecenttracks } from './lib/lastFm/getUserRecenttracks'

//  origin: https://github.com/microsoft/TypeScript/issues/14877#issuecomment-493729050
declare let self: ServiceWorkerGlobalScope
// fix cannot find module error
export default null

const SW_VERSION = '1.0.0'
const SW_NAME = 'sw-lastfm'

self.addEventListener('message', event => {
  const send = (...args: unknown[]) => {
    event.ports[0].postMessage(args)
  }

  switch (event.data.type) {
    case 'GET_TRACK':
      getUserRecenttracks().then(fr => {
        send(fr)
      })
      break
    case 'GET_VERSION':
      send(SW_VERSION)
      break
    case 'GET_NAME':
      send(SW_NAME)
      break
    default:
      send(SW_NAME)
      break
  }
})
