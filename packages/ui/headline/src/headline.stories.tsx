import * as React from 'react'
import styled from 'styled-components'
import { Meta, Story } from '@storybook/react'
import { DocsPage } from '@gattner/storybook'
import '@gattner/types'
import { textAligns, textSizes } from '@gattner/ui-theme'
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

const StyledSection = styled.section`
  padding: 2rem;
`

const size: HeadlineProps['size'][] = textSizes

export const Size = () => {
  return size.map((size, index) => (
    <StyledSection key={`${size}-${index} `}>
      <Headline size={size}>This is {size} text in a Headline</Headline>
    </StyledSection>
  ))
}

const align: HeadlineProps['align'][] = textAligns

export const Align = () => {
  return align.map((align, index) => (
    <StyledSection key={`${align}-${index} `}>
      <Headline align={align}>
        This is {align} aligned text in a Headline
      </Headline>
    </StyledSection>
  ))
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
