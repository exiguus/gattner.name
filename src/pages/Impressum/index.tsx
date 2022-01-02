import React, { FunctionComponent } from 'react'
import { address, vat, contact, title } from '../../../data/impressum.json'
import { PageLayout } from '../../layouts/PageLayout'
import { Headline } from '../../components/Headline'
import { Paragraph } from '../../components/Paragraph'
import { HorizontalBreak } from '../../components/HorizontalBreak'

const Impressum: FunctionComponent = () => {
  return (
    <PageLayout>
      <Headline text={title} />
      {address.map((text, index) => (
        <Paragraph key={index} text={text} />
      ))}
      <HorizontalBreak />
      {vat.map((text, index) => (
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
