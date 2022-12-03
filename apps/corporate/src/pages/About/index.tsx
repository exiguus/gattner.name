import React, { FunctionComponent } from 'react'
import { Blockquote } from '@gattner/ui-blockquote'
import { AboutProps } from '../../../schemas'
import { Headline } from '../../components/Headline'
import { Paragraph } from '../../components/Paragraph'
import { Face } from '../../components/Face'

const About: FunctionComponent<AboutProps> = ({ content, quote, title }) => {
  return (
    <>
      <Headline text={title} icon={<Face />} />
      <Blockquote>
        <Paragraph text={quote} />
      </Blockquote>
      {content.map((text, index) => (
        <Paragraph key={`cp-${index}`} text={text} />
      ))}
    </>
  )
}

export default About
