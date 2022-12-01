import { isPrerender } from './utils/prerender'
import {
  addPreloadScripts,
  addPrefetchFonts,
  fixDynamicImportScripts,
} from './utils/head'
import { addStyledComponentStyles } from './utils/styles'
import { track } from './lib/tracker'
import app from '../data/content/app.json'

const prerender = isPrerender()

const appId = 'root'
const appElement = document.getElementById(appId) as HTMLElement

appElement.setAttribute('data-prerender', `${prerender}`)

if (!prerender) {
  document.documentElement.setAttribute('data-js', 'true')
  const rSW = async () => {
    const { registerServiceWorker } = await import('./sw-register')
    registerServiceWorker()
  }
  rSW()
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
  await import('preact/devtools')
  const React = await import('react')
  const { hydrate, render } = await import('react-dom')
  const App = (await import('./App')).default
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
