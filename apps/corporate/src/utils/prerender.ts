declare global {
  interface Window {
    __PRERENDER?: boolean
  }
}

const isPrerender = (): boolean => !!window['__PRERENDER']

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

export { isPrerender, dispatchLoadingEvent }
