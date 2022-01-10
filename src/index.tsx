import 'preact/devtools'
import React from 'react'
import { hydrate, render } from 'react-dom'
import { isPrerender } from './utils/prerender'
import { addPreloadScripts, addPrefetchFonts } from './utils/head'
import { addStyledComponentStyles } from './utils/styles'

import app from '../data/content/app.json'
import App from './App'

const prerender = isPrerender()

const appId = 'root'
const appElement = document.getElementById(appId) as HTMLElement

const eventName = 'prerender-trigger'

if (!prerender) {
  document.documentElement.setAttribute('data-js', 'true')
}

appElement.setAttribute('data-prerender', `${prerender}`)

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
  if (prerender) {
    await addStyledComponentStyles()
    await addPreloadScripts()
    await addPrefetchFonts()
  }
  dispatchLoadingEvent({
    detail: {
      type: appId,
    },
  })
}

appElement.hasChildNodes()
  ? hydrate(
      <React.StrictMode>
        <App {...app} />
      </React.StrictMode>,
      appElement,
      callback
    )
  : render(
      <React.StrictMode>
        <App {...app} />
      </React.StrictMode>,
      appElement,
      callback
    )

if (process.env.NODE_ENV === 'production' && !prerender) {
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
