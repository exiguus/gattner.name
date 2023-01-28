import { isPrerender, dispatchLoadingEvent } from './utils/prerender'
const prerender = isPrerender()

const appId = 'root'
const appElement = document.getElementById(appId) as HTMLElement

appElement.setAttribute('data-prerender', `${prerender}`)

if (!prerender) {
  document.documentElement.setAttribute('data-js', 'true')
}

const callback = async (): Promise<void> => {
  await import('preact/devtools')
  if (prerender) {
    const { addPreloadScripts, addPrefetchFonts, removeDynamicImportScripts } =
      await import('./utils/head')
    const { addStyledComponentStyles } = await import('./utils/styles')
    await removeDynamicImportScripts()
    await addPreloadScripts()
    await addPrefetchFonts()

    setTimeout(async () => {
      await addStyledComponentStyles()
    }, 5000)
    setInterval(() => {
      dispatchLoadingEvent({
        detail: {
          type: appId,
        },
      })
    }, 10000)
  }
}

async function render(
  appElement: HTMLElement,
  callback: () => void
): Promise<void> {
  const React = (await import('react')).default
  const { hydrate, render } = (await import('react-dom')).default
  const App = (await import('./App')).default
  const app = await import('../data/content/app.json')
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

render(appElement, callback).then(async () => {
  if (!prerender) {
    const { registerServiceWorker } = await import('./sw-register')
    registerServiceWorker()
  }
  const { track } = await import('./lib/tracker')
  track({
    type: 'render',
    msg: 'App rendered',
    value: `App rendered`, // TODO: Add more details like render time
  })
})
