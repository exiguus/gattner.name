import { useEffect, useState } from 'react'

const isWindowClient = typeof window === 'object'

const useWindowSize = (): {
  width: number | undefined
  height: number | undefined
} => {
  const [windowSize, setWindowSize] = useState({
    width: isWindowClient
      ? window.innerWidth || document.body.offsetWidth
      : undefined,
    height: isWindowClient
      ? window.innerHeight || document.body.offsetHeight
      : undefined,
  })

  useEffect(() => {
    //a handler which will be called on change of the screen resize
    const setSize = (): void => {
      setWindowSize({
        width: window.innerWidth || document.body.offsetWidth,
        height: window.innerHeight || document.body.offsetHeight,
      })
    }

    if (isWindowClient) {
      //register the window resize listener
      window.addEventListener('resize', setSize)
      window.addEventListener('touchmove', setSize)
      window.addEventListener('orientationchange', setSize)
      //unregister the listerner on destroy of the hook
      return (): void => {
        window.removeEventListener('resize', setSize)
        window.removeEventListener('touchmove', setSize)
        window.removeEventListener('touchmove', setSize)
      }
    }
  }, [setWindowSize])

  return windowSize
}

export default useWindowSize
