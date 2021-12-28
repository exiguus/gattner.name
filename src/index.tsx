import 'preact/devtools'
import React from 'react'
import { hydrate, render } from 'react-dom'
import { isServer } from './utils/ssr'
import { preHeadLinkScripts, preHeadLinkFonts } from './utils/head'
import { addStyles } from './utils/styles'
import App from './App'

const ssr = isServer()

const appId = 'root'
const appElement = document.getElementById(appId) as HTMLElement

const eventName = 'prerender-trigger'

if (!ssr) {
  document.documentElement.setAttribute('data-js', 'true')
}

appElement.setAttribute('data-ssr', `${ssr}`)

const addLoadingEvent = ({ detail }: { detail?: object }): CustomEvent => {
  return new CustomEvent(eventName, {
    detail,
  })
}

const dispatchLoadingEvent = ({ detail }: { detail?: object }): boolean => {
  const target = document
  const event = addLoadingEvent({ detail })
  return target.dispatchEvent(event)
}

const callback = async (): Promise<void> => {
  await addStyles()
  await preHeadLinkScripts()
  await preHeadLinkFonts()
  dispatchLoadingEvent({
    detail: {
      type: appId,
    },
  })
}

appElement.hasChildNodes()
  ? hydrate(<App />, appElement, callback)
  : render(<App />, appElement, callback)

if (process.env.NODE_ENV === 'production' && !ssr) {
  const sw = '/service-worker.js'
  navigator.serviceWorker
    .register(sw)
    .then(registration => {
      registration.onupdatefound = (): void => {
        const installingWorker = registration.installing
        if (installingWorker == null) {
          return
        }
        installingWorker.onstatechange = (): void => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed.'
              )
            } else {
              console.log('Content is cached for offline use.')
            }
          }
        }
      }
    })
    .catch(error => {
      console.error('Error during service worker registration:', error)
    })
}
