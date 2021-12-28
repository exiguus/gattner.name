import React, { FunctionComponent, useEffect, useState } from 'react'
import theme from '../../styles/theme'
import SimonIcon from '../../assets/simon.svg'
import useVisible from '../../hooks/useVisible'
import { PageLayout } from '../../layouts/PageLayout'
import { Headline } from '../../components/Headline'
import { Paragraph } from '../../components/Paragraph'
import { Blockquote } from '../../components/Blockquote'
import { HorizontalBreak } from '../../components/HorizontalBreak'
import { content, contact, quote, title } from '../../../data/contact.json'

const Impressum: FunctionComponent = () => {
  const visible = useVisible()
  const { visibilityState } = visible
  const [hasSmile, setSmile] = useState(false)
  useEffect(() => {
    const setSmileTimeout = setTimeout(
      () => setSmile(visibilityState === 'visible'),
      1200
    )
    return function cleanup(): void {
      clearTimeout(setSmileTimeout)
    }
  }, [visibilityState])
  return (
    <PageLayout>
      <Headline
        text={title}
        icon={
          <SimonIcon
            fill={theme.application.color}
            stroke={hasSmile ? theme.application.color : 'transparent'}
          />
        }
      />
      <Blockquote>
        <Paragraph text={quote} />
      </Blockquote>
      {content.map((text, index) => (
        <Paragraph key={index} text={text} />
      ))}
      <HorizontalBreak />
      {contact.map((text, index) => (
        <Paragraph key={index} text={text} />
      ))}
    </PageLayout>
  )
}

export default Impressum
