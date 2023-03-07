import React, { FunctionComponent, useEffect } from 'react'
import { Blockquote } from '@gattner/ui-blockquote'
import { ContactProps } from '../../../schemas'
import { Headline } from '../../components/Headline'
import { Paragraph } from '../../components/Paragraph'
import { HorizontalBreak } from '../../components/HorizontalBreak'
import { List } from '../../components/List'
import { ListItem } from '../../components/ListItem'
import { Link } from '../../components/Link'
import { Face } from '../../components/Face'

const Contact: FunctionComponent<ContactProps> = ({
  content,
  contact,
  quote,
  title,
}) => {
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
      <Blockquote>
        <Paragraph text={quote} />
      </Blockquote>
      {content.map((text, index) => (
        <Paragraph key={`cp-${index}`} text={text} />
      ))}
      <HorizontalBreak />
      {contact.information.map((text, index) => (
        <Paragraph key={`ci-${index}`} text={text} />
      ))}
      <HorizontalBreak />
      <List type="line">
        {contact.links.map(({ id, text, href, title }) => (
          <ListItem key={`cl-${id}`}>
            <Link data-testid={`contact-link-${id}`} href={href} title={title}>
              {text}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default Contact
