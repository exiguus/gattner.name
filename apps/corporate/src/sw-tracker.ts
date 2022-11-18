import Tracker, { Api, isAction } from '@gattner/tracker'
import { isObject } from '@gattner/utils'
declare let self: ServiceWorkerGlobalScope & {
  swUtils: Record<string, unknown>
}
// fix cannot find module error
export default null

const SW_VERSION = '1.0.0'
const SW_NAME = 'sw-tracker'
const tracker = new Tracker({
  api: new Api(),
  count: 3,
  factor: 1.666,
  max: 23,
  debounce: 12000,
})

self.addEventListener('message', event => {
  const send = <T>(arg: T) => {
    event.ports[0].postMessage(arg)
  }
  if (isObject(event.data) && typeof event.data.type === 'string') {
    switch (event.data.type) {
      case 'PUSH_ACTIONS':
        if (
          Array.isArray(event.data.actions) &&
          event.data.actions.every(isAction)
        ) {
          event.data.actions.forEach(action => {
            console.log('action', action)
            tracker.push(action)
          })
        }
        break
      case 'SEND_ACTIONS':
        tracker.send()
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
  }
})
