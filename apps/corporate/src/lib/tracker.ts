import { isActionValue } from '@gattner/tracker/utils'
import { BrowserFingerprint } from '@gattner/tracker/BrowserFingerprint'
import { Action } from '@gattner/tracker/types'

const browserFingerprint = new BrowserFingerprint()
const fingerprint = browserFingerprint.result()

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
  const events = ['beforeunload', 'popstate', 'onhashchange']
  events.forEach(event => {
    window.addEventListener(event, async () => {
      window.sw.tracker.messageSW({
        type: 'SEND_ACTIONS',
      })
    })
  })
}

export const track = (...args: Array<Action['value']>) => {
  if (!('sw' in window && 'tracker' in window.sw)) return
  const actions = new Set<Action>()
  if (args.every(isActionValue)) {
    args.forEach(action => {
      const timestamp = Date.now()
      actions.add({ key: { timestamp }, value: action, append })
    })
  }
  window.sw.tracker.messageSW({
    type: 'PUSH_ACTIONS',
    actions: Array.from(actions),
  })
}
