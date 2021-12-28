/* eslint-disable no-restricted-globals */
import * as navigationPreload from 'workbox-navigation-preload'
import { precacheAndRoute } from 'workbox-precaching'
import {
  setDefaultHandler,
  registerRoute,
  NavigationRoute,
} from 'workbox-routing'
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
} from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

// Optional: use the injectManifest mode of one of the Workbox
// build tools to precache a list of URLs, including fallbacks.

// __WB_MANIFEST will be injected with workbox-build
precacheAndRoute(self.__WB_MANIFEST)

// Enable navigation preload.
navigationPreload.enable()

// Swap in NetworkOnly, CacheFirst, or StaleWhileRevalidate as needed.
const strategy = new NetworkFirst({
  cacheName: 'cached-navigations',
  plugins: [
    new ExpirationPlugin({
      maxAgeSeconds: 7 * 24 * 60 * 60,
      maxEntries: 42,
    }),
  ],
})

const navigationRoute = new NavigationRoute(strategy, {
  // Optionally, provide a allow/denylist of RegExps to determine
  // which paths will match this route.
  // allowlist: ['/', '/about', '/contact', '/impressum'],
  // denylist: [],
})

registerRoute(navigationRoute)

// Use an explicit cache-first strategy and a dedicated cache for last-fm
self.addEventListener('fetch', event => {
  if (event.request.url.startsWith('https://ws.audioscrobbler.com')) {
    const cacheFirst = new CacheFirst({
      cacheName: 'lastfm-cache',
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: 300,
          maxEntries: 8,
        }),
      ],
    })
    event.respondWith(cacheFirst.handle({ request: event.request }))
  }
})

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  if (url.origin === location.origin && url.pathname === '/') {
    event.respondWith(new StaleWhileRevalidate().handle({ event, request }))
  }
})

registerRoute(
  new RegExp('.*\\.(png|ico|jp?g|webp|gif)'),
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        maxEntries: 23,
      }),
    ],
  })
)

// Use a stale-while-revalidate strategy for all other requests.
setDefaultHandler(
  new StaleWhileRevalidate(),
  new CacheFirst({
    cacheName: 'default-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
        maxEntries: 42,
      }),
    ],
  })
)
