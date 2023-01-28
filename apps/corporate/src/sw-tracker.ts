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
