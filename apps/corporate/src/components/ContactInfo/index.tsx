import React from 'react'
import { useTranslate } from '../../hooks/useTranslate'
import { ContactList, isContactListInformationLink } from '../../../schemas'
import { Paragraph } from '@gattner/ui-paragraph'
import { HorizontalBreak } from '../HorizontalBreak'
import { List } from '../List'
import { ListItem } from '../ListItem'
import { Link } from '../Link'
import { SrOnly } from '../SrOnly'
import { isArray } from '@gattner/utils'

export const ContactInfo = ({
  contact,
  ...props
}: {
  contact: ContactList
}) => {
  const { t } = useTranslate()
  return (
    <div role="group" aria-label={t('a11y.contactInfo.label')} {...props}>
      {contact.information.map(
        (item, index) =>
          (isContactListInformationLink(item) && (
            <Paragraph key={`ci-information-${item.id}`} aria-label={item.id}>
              <Link href={item.href} title={item.title}>
                <SrOnly>{item.title}</SrOnly>
                <span aria-hidden="true">{item.text}</span>
              </Link>
            </Paragraph>
          )) ||
          (typeof item === 'string' && (
            <Paragraph key={`ci-information-${index}`}>{item}</Paragraph>
          ))
      )}
      {isArray(contact.links) && (
        <>
          <HorizontalBreak />
          <List type="line" aria-label={t('a11y.contactInfo.list.label')}>
            {contact.links.map(({ id, text, href, title }) => (
              <ListItem key={`cl-links-${id}`}>
                <Link
                  data-testid={`contact-link-${id}`}
                  href={href}
                  title={title}
                >
                  <SrOnly>{title}</SrOnly>
                  <span aria-hidden="true">{text}</span>
                </Link>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  )
}
