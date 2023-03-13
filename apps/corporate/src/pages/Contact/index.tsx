import React, { FunctionComponent, useEffect } from 'react'
import { Blockquote } from '@gattner/ui-blockquote'
import { ContactProps } from '../../../schemas'
import { useTranslate } from '../../hooks/useTranslate'
import { Headline } from '../../components/Headline'
import { Paragraph } from '../../components/Paragraph'
import { HorizontalBreak } from '../../components/HorizontalBreak'
import { Face } from '../../components/Face'
import { ContactInfo } from '../../components/ContactInfo'

const Contact: FunctionComponent<ContactProps> = ({
  content,
  contact,
  quote,
  title,
}) => {
  const { t } = useTranslate()

  useEffect(() => {
    import('../../lib/tracker').then(({ track }) => {
      track({
        type: 'load',
        msg: 'Contact loaded',
        value: `Contact Page loaded at location "${window.location.href}"`,
      })
    })
  }, [])

  return (
    <>
      <Headline text={title} icon={<Face />} />
      <Blockquote aria-label={t('a11y.contact.blockquote.label')}>
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

export default Contact
