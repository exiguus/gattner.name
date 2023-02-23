import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import { isTouch } from '@gattner/utils'
import { Link as LinkProps } from '../../../schemas'
import { Link } from '../Link'
import { List } from '../List'
import { ListItem } from '../ListItem'

// delta can be either a number or an object specifying different deltas for each direction, [left, right, up, down]
const SWIPE_DELTA = { left: 50, right: 50, up: 200, down: 200 }
// allowable duration of a swipe (ms)
const SWIPE_DURATION = 300

const StyledNavLink = styled(Link)`
  font-size: inherit;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    text-decoration: underline;
  }
`

const Navigation = ({ items }: { items: Array<LinkProps> }) => {
  const isTouchDevice = isTouch()
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

  useEffect(() => {
    if (!isTouchDevice) return
    documentRef(document as unknown as HTMLElement)
    return () => {
      documentRef(null)
    }
  })

  return (
    <List type="nav">
      {items.map(({ id, title, text, href }) => (
        <ListItem type="nav" key={`navigation-mli-${id}`}>
          <StyledNavLink
            dataTestId={`header-nav-link-${id}`}
            to={href}
            title={title}
            lineThrough={true}
          >
            {text}
          </StyledNavLink>
        </ListItem>
      ))}
    </List>
  )
}

export { Navigation }

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
