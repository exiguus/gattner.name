import React, { useState, useEffect } from 'react'
import useVisible from '../../hooks/useVisible'
import { Theme } from '../../../types/Theme'
import { Icon } from '../Icon'

export const Face = ({ theme }: { theme: Theme }) => {
  const visible = useVisible()
  const { visibilityState } = visible
  const [hasSmile, setSmile] = useState(false)
  useEffect(() => {
    const setSmileTimeout = setTimeout(() => {
      setSmile(visibilityState === 'visible')
    }, 1200)
    return function cleanup(): void {
      clearTimeout(setSmileTimeout)
    }
  }, [visibilityState])
  return (
    <Icon
      type="simon-alt"
      fill={theme.application.color}
      stroke={hasSmile ? theme.application.color : 'transparent'}
    />
  )
}
