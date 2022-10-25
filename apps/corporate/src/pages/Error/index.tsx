import React, { FunctionComponent, useEffect } from 'react'
import { getRandomInt } from '@gattner/utils'
import { Headline } from '@gattner/ui-headline'
import { Blockquote } from '@gattner/ui-blockquote'
import { ErrorProps } from '../../../schemas'
import { Paragraph } from '../../components/Paragraph'
import { HorizontalBreak } from '../../components/HorizontalBreak'
import { Group } from '../../components/Group'
import { useTranslate } from '../../hooks/useTranslate'

const Error: FunctionComponent<ErrorProps> = ({
  content,
  quote,
  title,
  description,
}) => {
  const { t } = useTranslate()
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
      <Paragraph aria-label={t('a11y.error.description.label')}>
        {description}
      </Paragraph>
      <Blockquote
        author={quote.author}
        cite={quote.cite}
        aria-label={t('a11y.error.quote.label')}
      >
        <Paragraph text={currentQuote} />
      </Blockquote>
      <HorizontalBreak />
      <Group label={t('a11y.error.detail.label')}>
        {content.map((text, index) => (
          <Paragraph key={`cp-${index}`} text={text} />
        ))}
      </Group>
    </>
  )
}

export default Error
