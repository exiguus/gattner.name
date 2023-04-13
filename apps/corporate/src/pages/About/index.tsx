import React, { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import { Blockquote } from '@gattner/ui-blockquote'
import { AboutProps } from '../../../schemas'
import { Headline } from '../../components/Headline'
import { Paragraph } from '../../components/Paragraph'
import { Face } from '../../components/Face'
import { HorizontalBreak } from '../../components/HorizontalBreak'
import { ContactInfo } from '../../components/ContactInfo'
import { Group } from '../../components/Group'
import { useTranslate } from '../../hooks/useTranslate'

const Introduction = styled(Group)`
  margin-bottom: 4rem;
`

const About: FunctionComponent<AboutProps> = ({
  content,
  quote,
  title,
  introduction,
  contact,
}) => {
  const { t } = useTranslate()

  useEffect(() => {
    import('../../lib/tracker').then(({ track }) => {
      track({
        type: 'load',
        msg: 'About loaded',
        value: `About Page loaded at location "${window.location.href}"`,
      })
    })
  }, [])

  return (
    <>
      <Headline text={title} icon={<Face />} />
      <Introduction label={t('a11y.about.introduction.label')}>
        <Blockquote aria-label={t('a11y.about.quote.label')}>
          <Paragraph text={introduction.quote} />
        </Blockquote>
        <HorizontalBreak line />
        {introduction.content.map((text, index) => (
          <Paragraph indent size="lg" key={`cp-${index}`} text={text} />
        ))}
        <HorizontalBreak line />
      </Introduction>
      <Blockquote aria-label={t('a11y.about.quote.label')}>
        <Paragraph text={quote} />
      </Blockquote>
      {content.map((text, index) => (
        <Paragraph key={`cp-${index}`} text={text} />
      ))}
      <HorizontalBreak />
      <ContactInfo contact={contact} />
    </>
  )
}

export default About
