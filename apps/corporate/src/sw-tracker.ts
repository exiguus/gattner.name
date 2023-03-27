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

// self refers to ServiceWorkerGlobalScope instead of window
//  origin: https://github.com/microsoft/TypeScript/issues/14877#issuecomment-493729050
declare let self: ServiceWorkerGlobalScope

self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event
  const url = new URL(request.url)
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    console.log({ url })
    cleanActions()
  }
})

let sendTimeout: NodeJS.Timeout | null = null

const sendWithTimeout = () => {
  if (sendTimeout) clearTimeout(sendTimeout)
  sendTimeout = setTimeout(() => {
    console.log('sendWithTimeout', trackerInstance)
    sendActions()
  }, 12000)
}

export const pushActions = (actions: unknown) => {
  if (Array.isArray(actions) && actions.every(isAction)) {
    actions.forEach(action => {
      trackerInstance.push(action)
    })
    sendWithTimeout()
  }
}

export const sendActions = () => {
  trackerInstance.send()
}

export const cleanActions = () => {
  console.log('cleanActions', trackerInstance)
  trackerInstance.clean()
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
        case 'TRACKER_CLEAN_ACTIONS':
          cleanActions()
          break
      }
    }
  })
}
