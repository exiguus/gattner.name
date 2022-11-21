import 'preact/devtools'
import React from 'react'
import { hydrate, render } from 'react-dom'
import { isPrerender } from './utils/prerender'
import {
  addPreloadScripts,
  addPrefetchFonts,
  fixDynamicImportScripts,
} from './utils/head'
import { addStyledComponentStyles } from './utils/styles'
import { Workbox } from 'workbox-window'
import { track, trackBindSendEvent } from './lib/tracker'
import App from './App'
import app from '../data/content/app.json'

const prerender = isPrerender()

const appId = 'root'
const appElement = document.getElementById(appId) as HTMLElement

declare global {
  interface Window {
    sw: Record<string, Workbox>
    swUtils: Record<string, unknown>
  }
}

const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.sw = window.sw || {}
    window.sw.lastfm = new Workbox('/sw-lastfm.js')
    window.sw.lastfm.register()
    window.sw.tracker = new Workbox('/sw-tracker.js')
    window.sw.tracker.register()
    trackBindSendEvent()
  }
  track({
    type: 'register',
    msg: 'Service Worker registered',
    value: `Service Worker in navigator is "${'serviceWorker' in navigator}"`,
  })
}

appElement.setAttribute('data-prerender', `${prerender}`)

if (!prerender) {
  document.documentElement.setAttribute('data-js', 'true')
  registerServiceWorker()
}

const eventName = 'prerender-trigger'

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
    await fixDynamicImportScripts()
    await addPreloadScripts()
    await addPrefetchFonts()

    setTimeout(async () => {
      await addStyledComponentStyles()
      dispatchLoadingEvent({
        detail: {
          type: appId,
        },
      })
    }, 5000)
  }
}

async function renderApp(): Promise<void> {
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
}

renderApp().then(() => {
  track({
    type: 'render',
    msg: 'App rendered',
    value: `App rendered`, // TODO: Add more details like render time
  })
})

if (process.env.NODE_ENV === 'production') {
  const sw = '/sw-cache.js'
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
