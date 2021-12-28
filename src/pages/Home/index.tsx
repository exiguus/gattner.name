import React, { FunctionComponent } from 'react'
import { description } from '../../../data/site.json'
import { PageLayout } from '../../layouts/PageLayout'
import { Paragraph } from '../../components/Paragraph'

const Home: FunctionComponent = () => {
  return (
    <PageLayout>
      <Paragraph text={description} animate={true} />
    </PageLayout>
  )
}

export default Home
