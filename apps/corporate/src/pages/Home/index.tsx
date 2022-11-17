import React, { FunctionComponent, useEffect } from 'react'
import Tracker, { Action, Api } from '@gattner/tracker'
import { getRandomInt } from '@gattner/utils'
import { HomeProps } from '../../../schemas'
import { Paragraph } from '../../components/Paragraph'
import { isPrerender } from '../../utils/prerender'

const tracker = new Tracker({
  api: new Api(),
  append: {
    pid: 1,
    name: 'gattner-corporate',
  },
  count: 1,
  factor: 1.666,
  max: 14,
  debounce: 2300,
})

const track = (...args: Array<Action['value']>) => {
  const timestamps: Set<number> = new Set()
  if (tracker != null) {
    args.forEach(action => {
      const timestamp = Date.now()
      timestamps.add(timestamp)
      if (tracker != null) tracker.push({ key: { timestamp }, value: action })
    })
  }
  return Array.from(timestamps)
}

const Home: FunctionComponent<HomeProps> = props => {
  const { content } = props
  const text = content[getRandomInt(0, content.length - 1)]
  track({
    type: 'render',
    msg: 'Homepage render',
    value: 'page: Homepage render',
  })

  useEffect(() => {
    track({
      type: 'onload',
      msg: 'Homepage loaded',
      value: 'page: Homepage loaded',
    })
    tracker.send()
  }, [])

  return (
    <>
      <Paragraph
        text={text}
        animate={true}
        dataTestId="slogan"
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
