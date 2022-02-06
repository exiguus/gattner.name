import { useEffect, useState } from 'react'

function useMatchMedia(query: string): boolean {
  const [state, setState] = useState(false)

  // check query and listen for media change
  useEffect(() => {
    if (!query) return

    const mql = window.matchMedia(query)

    const update = (mql: MediaQueryListEvent): void => {
      setState(mql.matches)
    }

    setState(mql.matches)

    mql.addEventListener('change', update)

    return (): void => {
      mql.removeEventListener('change', update)
    }
  }, [query])

  return state
}

export default useMatchMedia
