import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import { isTouch } from '@gattner/utils'
import { Link as LinkProps } from '../../../../schemas'

// delta can be either a number or an object specifying different deltas for each direction, [left, right, up, down]
const SWIPE_DELTA = { left: 50, right: 50, up: 200, down: 200 }
// allowable duration of a swipe (ms)
const SWIPE_DURATION = 300

export const Swipeable = ({
  items,
  children,
}: {
  items: Array<LinkProps>
  children: React.ReactElement
}) => {
  const history = useHistory()
  const currentIndex = items.findIndex(
    ({ href }) => href === history.location.pathname
  )
  const [historyChange, setHistoryChange] = useState(false)

  const { ref: documentRef } = useSwipeable({
    onSwiped: ({ dir }) => {
      if (historyChange) return

      switch (true) {
        case dir === 'Left':
          updateHistory({
            pathname: items[currentIndex + 1]?.href || '/',
            history,
            setHistoryChange,
          })
          break
        case dir === 'Right':
          updateHistory({
            pathname: items[currentIndex - 1]?.href || '/contact',
            history,
            setHistoryChange,
          })
          break
      }
    },
    onSwiping: ({ event }) => event.stopPropagation(),
    preventScrollOnSwipe: true,
    delta: SWIPE_DELTA,
    swipeDuration: SWIPE_DURATION,
  })

  const isTouchDevice = isTouch()

  useEffect(() => {
    if (!isTouchDevice) return
    documentRef(document as unknown as HTMLElement)
    return () => {
      documentRef(null)
    }
  })

  return children
}

function updateHistory({
  pathname,
  history,
  setHistoryChange,
}: {
  pathname: string
  history: ReturnType<typeof useHistory>
  setHistoryChange: React.Dispatch<React.SetStateAction<boolean>>
}) {
  if (history.location.pathname === pathname) return
  history.push(pathname)
  setHistoryChange(true)
}
