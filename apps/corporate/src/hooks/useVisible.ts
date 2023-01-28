import { useEffect, useMemo, useState } from 'react'

export interface PageVisibilityStateProps {
  readonly hidden: boolean
  // visible, hidden, prerender
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState
  readonly visibilityState: 'visible' | 'hidden' | 'prerender'
}

export const initialState: PageVisibilityStateProps = {
  hidden: document.hidden,
  visibilityState: document.visibilityState,
}

const useVisible = (): PageVisibilityStateProps => {
  const [state, setState] = useState(initialState)

  const onVisibilityChangeEvent = (event: unknown): void => {
    setState({
      hidden: document.hidden,
      visibilityState: document.visibilityState,
    })
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChangeEvent)

    return (): void => {
      document.removeEventListener('visibilitychange', onVisibilityChangeEvent)
    }
  }, [])

  return useMemo(() => state, [state])
}

export default useVisible
