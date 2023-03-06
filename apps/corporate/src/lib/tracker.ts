import { isActionValue, Action } from '@gattner/tracker'
import { BrowserFingerprint, isObject, waitFor } from '@gattner/utils'
import { AsyncStore } from '@gattner/storage'
import { isServiceWorkerOnline } from '../utils/serviceworker'
import { isPrerender } from '../utils/prerender'
import { validate } from '../utils/validate'
import { StaticAppend, staticAppendSchema } from '../../schemas/tracker'

const PAGE_ID = parseInt(process.env.TRACKER_PAGE_ID ?? '0')
const PAGE_NAME = process.env.TRACKER_PAGE_NAME ?? 'unknown'
const STORE_NAME = '__gattner__trackerAppend'
const STORE_TYPE = 'indexedDB'
const store = new AsyncStore({
  item: {
    name: STORE_NAME,
    type: STORE_TYPE,
  },
})
console.log({ store })

const isStaticAppendStore = (
  value: unknown
): value is { data: Record<string, unknown> } =>
  isObject(value) && isObject(value.data)

// self refers to ServiceWorkerGlobalScope instead of window
//  origin: https://github.com/microsoft/TypeScript/issues/14877#issuecomment-493729050
declare let self: ServiceWorkerGlobalScope

const generateAppend = async () => {
  let staticAppend: StaticAppend | null = null
  let data = null

  try {
    await store.open()
    const value = (await store.last()) || null
    data = isStaticAppendStore(value) ? value.data : null
    await store.close()
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error(error)
  }

  if (data) {
    try {
      validate<StaticAppend>(staticAppendSchema, data)
      staticAppend = data as StaticAppend
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log(error)
    }
  } else {
    await trackPushStoreStaticAppend()
  }

  return {
    pid: PAGE_ID,
    name: PAGE_NAME,
    url: isServiceWorkerOnline() ? window.location.href : self.location.href,
    navigator: isServiceWorkerOnline()
      ? `${navigator.userAgent || navigator.appVersion}`
      : `${self.navigator.userAgent || self.navigator.appVersion}`,
    origin: isServiceWorkerOnline()
      ? window.origin || document.location.origin
      : self.location.origin,
    referrer: isServiceWorkerOnline()
      ? document.referrer
      : self.serviceWorker?.scriptURL || 'unknown',
    fingerprint: 0,
    ...staticAppend,
  }
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

export async function trackPushStoreStaticAppend() {
  if (isPrerender() || typeof window === 'undefined') return

  const staticAppend: StaticAppend = {
    pid: 1,
    name: 'gattner-corporate',
    fingerprint: new BrowserFingerprint().result(),
  }

  let data = null
  try {
    await store.open()
    const value = (await store.last()) || { data: null }
    data = isStaticAppendStore(value) ? value.data : null
    await store.close()
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error(error)
  }

  if (data) {
    validate<StaticAppend>(staticAppendSchema, data)
  } else {
    try {
      await store.open()
      await store.push({ timestamp: Date.now(), data: staticAppend })
      await store.close()
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.error(error)
    }
  }
}

export const track = (...args: Array<Action['value']>) => {
  if (args.length === 0 || isPrerender()) return
  if (args.every(isActionValue)) {
    waitFor(() => isServiceWorkerOnline(), 'trackerAddActions')
      .then(async res => {
        await res
        await sendPushActions(args)
      })
      .catch(error => {
        if (process.env.NODE_ENV === 'development')
          console.log('trackerAddActions', error)
      })
  }
}

const sendPushActions = async (actions: Array<Action['value']>) => {
  const actionItems = new Set<Action>()
  const append = await generateAppend()
  actions.forEach(action => {
    const timestamp = Date.now()
    actionItems.add({
      key: { timestamp },
      value: action,
      append,
    })
  })
  return isServiceWorkerOnline()
    ? window.sw.messageSW({
        type: 'TRACKER_PUSH_ACTIONS',
        actions: Array.from(actionItems),
      })
    : self.serviceWorker.postMessage({
        type: 'TRACKER_PUSH_ACTIONS',
        actions: Array.from(actionItems),
      })
}
