import * as React from 'react'
import styled from 'styled-components'
import { Meta, Story } from '@storybook/react'
import { DocsPage } from '@gattner/storybook'
import '@gattner/types'
import Readme from '../README.md'

import { Headline, HeadlineProps } from '.'

export default {
  title: 'Molecules/Headline',
  component: Headline,
  parameters: {
    docs: {
      page: () => <DocsPage markdown={Readme} />,
    },
  },
} as Meta<HeadlineProps>

const Template: Story<HeadlineProps> = args => <Headline {...args} />

export const _Default = Template.bind({})

_Default.args = {
  text: 'This is a shared ui library. And it is very good!',
}

export const Children = Template.bind({})

const StyledColor = styled.span`
  text-decoration: underline;
`

const StyledStrong = styled.strong`
  text-transform: uppercase;
`

Children.args = {
  children: (
    <>
      <StyledColor>This</StyledColor> is a shared{' '}
      <StyledStrong>ui library</StyledStrong>.<br />
      And it is very good!
    </>
  ),
}

export const Icon = Template.bind({})

Icon.args = {
  icon: <>🍍</>,
  text: 'Screenreader only readable text',
}

export const SrOnly = Template.bind({})

SrOnly.args = {
  srOnly: true,
  text: 'Screenreader only readable text',
}
