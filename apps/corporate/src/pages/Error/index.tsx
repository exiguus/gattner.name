import React, { FunctionComponent, useEffect } from 'react'
import { getRandomInt } from '@gattner/utils'
import { Blockquote } from '@gattner/ui-blockquote'
import { ErrorProps } from '../../../schemas'
import { Headline } from '../../components/Headline'
import { Paragraph } from '../../components/Paragraph'
import { HorizontalBreak } from '../../components/HorizontalBreak'

const Error: FunctionComponent<ErrorProps> = ({
  content,
  quote,
  title,
  description,
}) => {
  const currentQuote = quote.content[getRandomInt(0, quote.content.length)]
  useEffect(() => {
    if (currentQuote)
      import('../../lib/tracker').then(({ track }) => {
        track({
          type: 'load',
          msg: 'Error loaded',
          value: `Error Page loaded at location "${window.location.href} with Quote "${currentQuote}"`,
        })
      })
  }, [currentQuote])

  return (
    <>
      <Headline>{title}</Headline>
      <Paragraph>{description}</Paragraph>
      <Blockquote author={quote.author} cite={quote.cite}>
        <Paragraph text={currentQuote} />
      </Blockquote>
      <HorizontalBreak />
      {content.map((text, index) => (
        <Paragraph key={`cp-${index}`} text={text} />
      ))}
    </>
  )
}

export default Error
