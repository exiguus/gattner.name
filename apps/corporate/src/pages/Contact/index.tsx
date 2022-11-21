import React, { FunctionComponent, useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { Blockquote } from '@gattner/ui-blockquote'
import { ContactProps } from '../../../schemas'
import useVisible from '../../hooks/useVisible'
import { Headline } from '../../components/Headline'
import { Paragraph } from '../../components/Paragraph'
import { HorizontalBreak } from '../../components/HorizontalBreak'
import { List } from '../../components/List'
import { ListItem } from '../../components/ListItem'
import { Link } from '../../components/Link'
import { Icon } from '../../components/Icon'

const Impressum: FunctionComponent<ContactProps> = ({
  content,
  contact,
  quote,
  title,
}) => {
  const theme = useTheme()
  const visible = useVisible()
  const { visibilityState } = visible
  const [hasSmile, setSmile] = useState(false)
  const [iconFill, setIconFill] = useState(theme.application.color)

  useEffect(() => {
    const setSmileTimeout = setTimeout(
      () => setSmile(visibilityState === 'visible'),
      1200
    )
    return function cleanup(): void {
      clearTimeout(setSmileTimeout)
    }
  }, [visibilityState])

  useEffect(() => {
    setIconFill(theme.application.color)
  }, [theme.application.color])

  return (
    <>
      <Headline
        text={title}
        icon={
          <Icon
            type="simon-alt"
            fill={iconFill}
            stroke={hasSmile ? iconFill : 'transparent'}
          />
        }
      />
      <Blockquote>
        <Paragraph text={quote} />
      </Blockquote>
      {content.map((text, index) => (
        <Paragraph key={`cp-${index}`} text={text} />
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
      <HorizontalBreak />
      {contact.information.map((text, index) => (
        <Paragraph key={`ci-${index}`} text={text} />
      ))}
    </>
  )
}

export default Impressum
