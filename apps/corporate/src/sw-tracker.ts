import Tracker, { isAction } from '@gattner/tracker'
import Api from '@gattner/supabase'
import { isObject } from '@gattner/utils'

const trackerInstance = new Tracker({
  api: new Api(),
  count: 8,
  factor: 1.666,
  max: 23,
  debounce: 12000,
})

export const pushActions = (actions: unknown) => {
  if (Array.isArray(actions) && actions.every(isAction)) {
    actions.forEach(action => {
      trackerInstance.push(action)
    })
  }
}

export const sendActions = () => {
  trackerInstance.send()
}

export const tracker = (self: ServiceWorkerGlobalScope) => {
  self.addEventListener('message', event => {
    if (isObject(event.data) && typeof event.data.type === 'string') {
      switch (event.data.type) {
        case 'TRACKER_PUSH_ACTIONS':
          pushActions(event.data.actions)
          break
        case 'TRACKER_SEND_ACTIONS':
          sendActions()
          break
      }
    }
  })
}
