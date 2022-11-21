import React, { FunctionComponent, useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { Blockquote } from '@gattner/ui-blockquote'
import { AboutProps } from '../../../schemas'
import useVisible from '../../hooks/useVisible'
import { Headline } from '../../components/Headline'
import { Paragraph } from '../../components/Paragraph'
import { Icon } from '../../components/Icon'

const About: FunctionComponent<AboutProps> = ({ content, quote, title }) => {
  const visible = useVisible()
  const theme = useTheme()
  const { visibilityState } = visible
  const [hasSmile, setSmile] = useState(false)
  const [iconFill, setIconFill] = useState(theme.application.color)

  useEffect(() => {
    const setSmileTimeout = setTimeout(() => {
      setSmile(visibilityState === 'visible')
    }, 1200)
    return function cleanup(): void {
      clearTimeout(setSmileTimeout)
    }
  }, [visibilityState])

  useEffect(() => {
    setIconFill(theme.application.color)
  }, [theme.application.color])

  return (
    <>
      <Headline
        text={title}
        icon={
          <Icon
            type="simon-alt"
            fill={iconFill}
            stroke={hasSmile ? iconFill : 'transparent'}
          />
        }
      />
      <Blockquote>
        <Paragraph text={quote} />
      </Blockquote>
      {content.map((text, index) => (
        <Paragraph key={`cp-${index}`} text={text} />
      ))}
    </>
  )
}

export default About
