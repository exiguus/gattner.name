import React, { FunctionComponent, useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { AboutProps } from '../../../schemas'
import useVisible from '../../hooks/useVisible'
import { Headline } from '../../components/Headline'
import { Paragraph } from '../../components/Paragraph'
import { Blockquote } from '../../components/Blockquote'
import { Icon } from '../../components/Icon'
import { sentryWithExtras } from '../../hooks/useSentry'

const About: FunctionComponent<AboutProps> = ({ content, quote, title }) => {
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

  const theme = useTheme()

  return (
    <>
      <Headline
        text={title}
        icon={
          <Icon
            type="simon-alt"
            fill={theme.application.color}
            stroke={hasSmile ? theme.application.color : 'transparent'}
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
