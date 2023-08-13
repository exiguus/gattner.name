import React from 'react'
import styled from 'styled-components'
import { Meta } from '@storybook/react'
import { Docs } from '@gattner/storybook'
import { Blockquote } from '@gattner/ui-blockquote'
import '@gattner/types'
import Readme from './README.md'

const Header = styled.section`
  padding: 8em 4em 2em 4em;
`

const Section = styled.section`
  padding: 1em;
  margin-bottom: 1em;
`

export const Story = () => (
  <>
    <Header>
      <Blockquote
        cite="README.md"
        author="Simon"
        quote="This is a shared ui library. And it is very good!"
      />
    </Header>
    <Section>
      <Docs markdown={Readme} />
    </Section>
  </>
)

export default {
  title: 'Page/UI',
  description: 'dark and light styled-components theme',
  component: Story,
} as Meta
