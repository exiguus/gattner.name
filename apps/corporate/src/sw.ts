import { isObject } from '@gattner/utils'
import { precacheAndRoute } from 'workbox-precaching'
// import must start with '../src/'
//  because precacheAndRoute is updated on build by workbox-build in ../public/sw.js
import { cache } from '../src/sw-cache'
import { lastfm } from '../src/sw-lastfm'
import { tracker } from '../src/sw-tracker'

// self refers to ServiceWorkerGlobalScope instead of window
//  origin: https://github.com/microsoft/TypeScript/issues/14877#issuecomment-493729050
declare let self: ServiceWorkerGlobalScope
// fix cannot find module error
export default null

const SW_VERSION = '1.0.0'
const SW_NAME = 'sw'

// Optional: use the injectManifest mode of one of the Workbox
// build tools to precache a list of URLs, including fallbacks.
if (process.env.NODE_ENV === 'production') {
  // __WB_MANIFEST will be injected with workbox-build
  precacheAndRoute(self.__WB_MANIFEST)

  cache(self)
  tracker(self)
}
lastfm(self)

self.addEventListener('message', event => {
  const send = <T>(arg: T) => {
    event.ports[0].postMessage(arg)
  }

  if (isObject(event.data) && typeof event.data.type === 'string') {
    switch (event.data.type) {
      case 'GET_VERSION':
        send(SW_VERSION)
        break
      case 'GET_NAME':
        send(SW_NAME)
        break
    }
  }
})
