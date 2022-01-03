import React, { FunctionComponent } from 'react'
import { HomeProps } from '../../../schemas'
import { Paragraph } from '../../components/Paragraph'
import { getRandomInt } from '../../utils'
import { isPrerender } from '../../utils/prerender'

const Home: FunctionComponent<HomeProps> = props => {
  const { content } = props
  const text = content[getRandomInt(0, content.length - 1)]
  return (
    <>
      <Paragraph
        text={text}
        animate={true}
        dataTestid="slogan"
        data-content="false"
      />
      {isPrerender() &&
        content.map((text, index) => (
          <Paragraph isContent={true} key={`cp-${index}`} text={text} />
        ))}
    </>
  )
}

export default Home
