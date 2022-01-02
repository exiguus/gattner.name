import React, { FunctionComponent, useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { content, contact, quote, title } from '../../../data/contact.json'
import useVisible from '../../hooks/useVisible'
import { PageLayout } from '../../layouts/PageLayout'
import { Headline } from '../../components/Headline'
import { Paragraph } from '../../components/Paragraph'
import { Blockquote } from '../../components/Blockquote'
import { HorizontalBreak } from '../../components/HorizontalBreak'
import { List } from '../../components/List'
import { ListItem } from '../../components/ListItem'
import { Link } from '../../components/Link'
import { Icon } from '../../components/Icon'

const Impressum: FunctionComponent = () => {
  const visible = useVisible()
  const { visibilityState } = visible
  const [hasSmile, setSmile] = useState(false)
  useEffect(() => {
    const setSmileTimeout = setTimeout(
      () => setSmile(visibilityState === 'visible'),
      1200
    )
    return function cleanup(): void {
      clearTimeout(setSmileTimeout)
    }
  }, [visibilityState])

  const theme = useTheme()

  return (
    <PageLayout>
      <Headline
        text={title}
        icon={
          <Icon
            type="simon-alt"
            fill={theme.application.color}
            stroke={hasSmile ? theme.application.color : 'transparent'}
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
        {contact.links.map(({ text, href, title }, index) => (
          <ListItem key={`cl-${index}`}>
            <Link href={href} title={title}>
              {text}
            </Link>
          </ListItem>
        ))}
      </List>
      <HorizontalBreak />
      {contact.information.map((text, index) => (
        <Paragraph key={`ci-${index}`} text={text} />
      ))}
    </PageLayout>
  )
}

export default Impressum
