import * as navigationPreload from 'workbox-navigation-preload'
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

export const cache = (self: ServiceWorkerGlobalScope) => {
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
    denylist: [new RegExp('/error')],
  })

  registerRoute(navigationRoute)

  self.addEventListener('fetch', (event: FetchEvent) => {
    const { request } = event
    const url = new URL(request.url)

    // eslint-disable-next-line no-restricted-globals
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
          maxEntries: 128,
        }),
      ],
    })
  )

  registerRoute(
    new RegExp(`^${process.env.LAST_FM_API_HOST}`),
    new CacheFirst({
      cacheName: 'lastfm-cache',
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: 300,
          maxEntries: 8,
        }),
      ],
    })
  )
  // Use a stale-while-revalidate strategy for all other requests.
  setDefaultHandler(
    // new StaleWhileRevalidate(),
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
}
