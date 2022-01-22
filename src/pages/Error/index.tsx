import React, { FunctionComponent } from 'react'
import { ErrorProps } from '../../../schemas'
import { Headline } from '../../components/Headline'
import { Paragraph } from '../../components/Paragraph'
import { Blockquote } from '../../components/Blockquote'
import { HorizontalBreak } from '../../components/HorizontalBreak'
import { getRandomInt } from '../../utils'

const Error: FunctionComponent<ErrorProps> = ({ content, quote, title }) => {
  const currentQuote = quote.content[getRandomInt(0, quote.content.length)]
  return (
    <>
      <Headline>{title}</Headline>
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
