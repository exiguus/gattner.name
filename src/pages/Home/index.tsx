import React, { FunctionComponent } from 'react'
import { content } from '../../../data/home.json'
import { PageLayout } from '../../layouts/PageLayout'
import { Paragraph } from '../../components/Paragraph'
import { getRandomInt } from '../../utils'
import { isServer } from '../../utils/ssr'

const Home: FunctionComponent = () => {
  const text = content[getRandomInt(0, content.length - 1)]
  return (
    <PageLayout>
      <Paragraph text={text} animate={true} data-content="yes" />
      {isServer() &&
        content.map((text, index) => (
          <Paragraph isContent={true} key={`cp-${index}`} text={text} />
        ))}
    </PageLayout>
  )
}

export default Home
