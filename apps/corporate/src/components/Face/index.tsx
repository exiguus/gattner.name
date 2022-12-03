import React, { useState, useEffect } from 'react'
import useVisible from '../../hooks/useVisible'
import { Icon } from '../Icon'
import { useTheme } from '../../hooks/useTheme'
import { isPrerender } from '../../utils/prerender'

export const Face = () => {
  const { theme } = useTheme()
  const visible = useVisible()
  const { visibilityState } = visible
  const [hasSmile, setSmile] = useState(false)
  const prerender = isPrerender()

  useEffect(() => {
    if (prerender) return
    const setSmileTimeout = setTimeout(() => {
      setSmile(visibilityState === 'visible')
    }, 1200)
    return function cleanup(): void {
      if (prerender) return
      clearTimeout(setSmileTimeout)
    }
  }, [prerender, visibilityState])
  return (
    <Icon
      type="simon-alt"
      fill={theme.application.color}
      stroke={hasSmile ? theme.application.color : 'transparent'}
    />
  )
}
