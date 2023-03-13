import React, { FunctionComponent, useEffect } from 'react'
import { ImpressumProps } from '../../../schemas'
import { useTranslate } from '../../hooks/useTranslate'
import { Headline } from '../../components/Headline'
import { Paragraph } from '../../components/Paragraph'
import { HorizontalBreak } from '../../components/HorizontalBreak'
import { ContactInfo } from '../../components/ContactInfo'
import { Group } from '../../components/Group'

const Impressum: FunctionComponent<ImpressumProps> = ({
  address,
  vat,
  contact,
  title,
}) => {
  const { t } = useTranslate()

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
      <Group label={t('a11y.impressum.group.address.label')}>
        {address.map((text, index) => (
          <Paragraph key={index} text={text} />
        ))}
      </Group>
      <HorizontalBreak />
      <Group label={t('a11y.impressum.group.vat.label')}>
        {vat.map((text, index) => (
          <Paragraph key={index} text={text} />
        ))}
      </Group>
      <HorizontalBreak />
      <Group label={t('a11y.impressum.group.contact.label')}>
        <ContactInfo contact={contact} />
      </Group>
    </>
  )
}

export default Impressum
