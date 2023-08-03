import React, { FunctionComponent, useEffect } from 'react'
import { getRandomInt } from '@gattner/utils'
import { HomeProps } from '../../../schemas'
import { Paragraph } from '@gattner/ui-paragraph'
import { isPrerender } from '../../utils/prerender'

const Home: FunctionComponent<HomeProps> = props => {
  const { content } = props
  const text = content[getRandomInt(0, content.length - 1)]

  useEffect(() => {
    import('../../lib/tracker').then(({ track }) => {
      track({
        type: 'load',
        msg: 'Home loaded',
        value: `Home Page loaded at location "${window.location.href}" with Slogan "${text}"`,
      })
    })
  }, [text])

  useEffect(() => {
    // this is a hack to prevent showing prerendered content blinking on hydration
    if (!isPrerender())
      document
        .querySelector('[data-page]')
        ?.setAttribute('data-page', 'content-loaded')
  }, [])

  return (
    <div data-page="content">
      {isPrerender() ? (
        content.map((text, index) => (
          <Paragraph isContent={true} key={`cp-${index}`} text={text} />
        ))
      ) : (
        <Paragraph
          text={text}
          animate={true}
          dataTestId="slogan"
          data-content="false"
        />
      )}
    </div>
  )
}

export default Home
