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
precacheAndRoute([{"revision":"e54e56b571f1e20a762aabace68b5a55","url":"about/index.html"},{"revision":"fc149e4e764aedd189ce92139de845f3","url":"android-chrome-192x192.eea872c7.png"},{"revision":"88c3bf2c40b4574a3f90d2fe02de2d8f","url":"android-chrome-512x512.b48c1b9c.png"},{"revision":"d5315e526be8097543f06ba08b746bdf","url":"apple-touch-icon.78aca0cb.png"},{"revision":"55835a3890ef17360a3e7173b627713e","url":"contact/index.html"},{"revision":"7fcff12a7b8af4e96528ef0dd90c90ce","url":"favicon-16x16.d6a89f28.png"},{"revision":"bbb4935cf13d353b5a13d854114e8608","url":"favicon-32x32.94cd8979.png"},{"revision":"56e880ec6629cfe6a254bc193d5b6d9d","url":"ibm-plex-mono-v6-latin-300.36397342.woff2"},{"revision":"0c4a54706495d75dc9e484eb51714f46","url":"ibm-plex-mono-v6-latin-600.9893db3a.woff2"},{"revision":"b314504091cd008ceabf4bb13f0ee0a2","url":"impressum/index.html"},{"revision":"5a418eceb7c1c2923f8ed5189cdeb6ce","url":"index.html"},{"revision":"250abdaaceeec1eb68992f8c3bc8b082","url":"report.html"},{"revision":"cfe3d26783a61904ef174231242e1661","url":"site.webmanifest"},{"revision":"0c5695d7b5a9e47c6f835caa09d3f0ce","url":"src.e77b0f2b.js"},{"revision":"3b440e32262a8ed1305167934bfd7b3b","url":"src.e77b0f2b.js.map"}])

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
