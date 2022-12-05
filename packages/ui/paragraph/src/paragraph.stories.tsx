import * as React from 'react'
import styled from 'styled-components'
import { Meta, Story } from '@storybook/react'
import { DocsPage } from '@gattner/storybook'
import '@gattner/types'
import Readme from '../README.md'

import { Paragraph, ParagraphProps } from '.'

export default {
  title: 'Molecules/Paragraph',
  component: Paragraph,
  parameters: {
    docs: {
      page: () => <DocsPage markdown={Readme} />,
    },
  },
} as Meta<ParagraphProps>

const Template: Story<ParagraphProps> = args => <Paragraph {...args} />

export const _Default = Template.bind({})

_Default.args = {
  text: 'This is a shared ui library. And it is very good!',
}

const StyledSection = styled.section`
  padding: 2rem;
`

const aligns: ParagraphProps['align'][] = ['left', 'right', 'center']
export const Align = () => {
  return aligns.map((align, index) => (
    <StyledSection key={`${align}-${index} `}>
      <Paragraph align={align}>
        This is {align} aligned text in a paragraph.
      </Paragraph>
    </StyledSection>
  ))
}

export const Animate = Template.bind({})

Animate.args = {
  animate: true,
  text: 'This is animated text in a paragraph.',
}
