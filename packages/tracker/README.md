# @gattner/tracker

Tracking Utils with Superbase backend

## TODO

- [x] add Superbase API
- [ ] mock Superbase API
  - [ ] service worker adapter
- [x] fingerprinting
  - [x] adjust murmurhash3_32_gc hash algorithm
  - [x] package
- [x] add service worker version

## MurmurHash3

non-cryptographic hash function suitable for general hash-based lookup

- <https://en.wikipedia.org/wiki/MurmurHash>
- <https://github.com/garycourt/murmurhash-js/blob/master/murmurhash3_gc.js>

## Usage

```javascript
// file lib/tracker
import { isActionValue, Action } from '@gattner/tracker'
import { BrowserFingerprint } from '@gattner/utils'
import { isPrerender } from '../utils/prerender'

const browserFingerprint = isPrerender() ? null : new BrowserFingerprint()
const fingerprint = browserFingerprint ? browserFingerprint.result() : 1

const append = {
  pid: 1,
  name: 'gattner-corporate',
  url: window.location.href,
  navigator: `${navigator.userAgent || navigator.appVersion}`,
  origin: window.origin || document.location.origin,
  referrer: document.referrer,
  fingerprint,
}

export function trackBindSendEvent() {
  if (isPrerender()) return
  const events = ['beforeunload', 'popstate', 'onhashchange']
  events.forEach(event => {
    window.addEventListener(event, async () => {
      window.sw.messageSW({
        type: 'TRACKER_SEND_ACTIONS',
      })
    })
  })
}

export const track = (...args: Array<Action['value']>) => {
  if (isPrerender() || !('sw' in window)) return
  const actions = new Set<Action>()
  if (args.every(isActionValue)) {
    args.forEach(action => {
      const timestamp = Date.now()
      actions.add({ key: { timestamp }, value: action, append })
    })
  }
  window.sw.messageSW({
    type: 'TRACKER_PUSH_ACTIONS',
    actions: Array.from(actions),
  })
}
```

```javascript
// service worker
import Tracker, { isAction } from '@gattner/tracker'
import Api from '@gattner/supabase'
import { isObject } from '@gattner/utils'

const trackerInstance = new Tracker({
  api: new Api(),
  count: 3,
  factor: 1.666,
  max: 23,
  debounce: 12000,
})

export const tracker = (self: ServiceWorkerGlobalScope) => {
  self.addEventListener('message', event => {
    if (isObject(event.data) && typeof event.data.type === 'string') {
      switch (event.data.type) {
        case 'TRACKER_PUSH_ACTIONS':
          if (
            Array.isArray(event.data.actions) &&
            event.data.actions.every(isAction)
          ) {
            event.data.actions.forEach(action => {
              trackerInstance.push(action)
            })
          }
          break
        case 'TRACKER_SEND_ACTIONS':
          trackerInstance.send()
          break
      }
    }
  })
}
```

```javascript
// component, page or layout in callback or useEffect
import('lib/tracker').then(({ track }) => {
  track({
    type: 'click',
    msg: 'Link clicked',
    value: `Link clicked with to "${to}" and "${title}"`,
  })
})
```
