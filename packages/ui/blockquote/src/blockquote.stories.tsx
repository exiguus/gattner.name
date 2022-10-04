// Blockquote.stories.tsx
import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { Blockquote, BlockquoteProps } from '.'

export default {
  title: 'Blockquote',
  component: Blockquote,
} as Meta<BlockquoteProps>

export const _Default: Story<BlockquoteProps> = args => <Blockquote {...args} />

_Default.args = {
  cite: 'README.md',
  author: 'Simon',
  quote: 'This is a shared ui library. And it is very good!',
}
