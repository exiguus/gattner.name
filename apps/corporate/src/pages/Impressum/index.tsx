import React, { FunctionComponent, useEffect } from 'react'
import { ImpressumProps } from '../../../schemas'
import { Headline } from '../../components/Headline'
import { Paragraph } from '../../components/Paragraph'
import { HorizontalBreak } from '../../components/HorizontalBreak'

const Impressum: FunctionComponent<ImpressumProps> = ({
  address,
  vat,
  contact,
  title,
}) => {
  useEffect(() => {
    import('../../lib/tracker').then(({ track }) => {
      track({
        type: 'load',
        msg: 'Impressum loaded',
        value: `Impressum Page loaded at location "${window.location.href}"`,
      })
    })
  }, [])

  return (
    <>
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
    </>
  )
}

export default Impressum
