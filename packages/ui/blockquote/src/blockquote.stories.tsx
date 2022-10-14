import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { DocsPage } from '@gattner/storybook'
import '@gattner/types'
import Readme from '../README.md'

import { Blockquote, BlockquoteProps } from '.'

export default {
  title: 'Molecules/Blockquote',
  component: Blockquote,
  parameters: {
    docs: {
      page: () => <DocsPage markdown={Readme} />,
    },
  },
} as Meta<BlockquoteProps>

const Template: Story<BlockquoteProps> = args => <Blockquote {...args} />

export const _Default = Template.bind({})

_Default.args = {
  cite: 'README.md',
  author: 'Simon',
  quote: 'This is a shared ui library. And it is very good!',
}

export const Quote = Template.bind({})

Quote.args = {
  cite: 'README.md',
  author: 'Simon',
  children: <p>This is a shared ui library. And it is very good!</p>,
}

export const QuoteList = Template.bind({})

QuoteList.args = {
  cite: 'Doctype',
  author: 'Browser',
  children: (
    <ul>
      <li>This is the first list item!</li>
      <li>and a second will always follow.</li>
    </ul>
  ),
}
