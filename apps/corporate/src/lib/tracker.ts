import { isActionValue, Action } from '@gattner/tracker'
import { BrowserFingerprint, MurmurHash3, waitFor } from '@gattner/utils'
import { isServiceWorker } from '../utils/serviceworker'
import { isPrerender } from '../utils/prerender'
import { pushActions } from '../sw-tracker'

// self refers to ServiceWorkerGlobalScope instead of window
//  origin: https://github.com/microsoft/TypeScript/issues/14877#issuecomment-493729050
declare let self: ServiceWorkerGlobalScope

const appendBase = {
  pid: 1,
  name: 'gattner-corporate',
  url: '',
  navigator: '',
  origin: '',
  referrer: '',
  fingerprint:
    typeof window !== 'undefined' && !isPrerender()
      ? new BrowserFingerprint().result()
      : // self refers to ServiceWorkerGlobalScope instead of window
        //  also this is the reason why we need to use a different fingerprint for the service worker
        //  the service worker does not have access to the window
        //  therefore we have to find a way to generate a fingerprint for the service worker and the window
        new MurmurHash3(self.serviceWorker.scriptURL).result(),
}

const generateAppend = () => ({
  ...appendBase,
  url: window.location.href,
  navigator: `${navigator.userAgent || navigator.appVersion}`,
  origin: window.origin || document.location.origin,
  referrer: document.referrer,
})

const generateAppendSW = () => ({
  ...appendBase,
  url: self.location.href,
  navigator: `${self.navigator.userAgent || self.navigator.appVersion}`,
  origin: self.location.origin,
  referrer: self.serviceWorker.scriptURL,
})

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
  if (args.length === 0 || isPrerender()) return
  if (args.every(isActionValue)) {
    waitFor(() => isServiceWorker(), 'trackerAddActions', 30)
      .then(async res => {
        await res
        return isServiceWorker()
          ? sendPushActions(args)
          : sendPushActionsSW(args)
      })
      .catch(error => {
        if (process.env.NODE_ENV === 'development')
          console.log('trackerAddActions', error)
      })
  }
}

const sendPushActions = (actions: Array<Action['value']>) => {
  const actionItems = new Set<Action>()
  actions.forEach(action => {
    const timestamp = Date.now()
    actionItems.add({
      key: { timestamp },
      value: action,
      append: generateAppend(),
    })
  })
  return window.sw.messageSW({
    type: 'TRACKER_PUSH_ACTIONS',
    actions: Array.from(actionItems),
  })
}

const sendPushActionsSW = (actions: Array<Action['value']>) => {
  const actionItems = new Set<Action>()
  actions.forEach(action => {
    const timestamp = Date.now()
    actionItems.add({
      key: { timestamp },
      value: action,
      append: generateAppendSW(),
    })
  })
  return pushActions(Array.from(actionItems))
}
