import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs'

const Readme = styled(ReactMarkdown)`
  position: relative;
  overflow: hidden;
  margin: 25px 0 40px;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 60px;
  color: rgba(0, 0, 0, 0.7);

  > * {
    font-size: 0.8em;
    line-height: 1.2em;
    margin-bottom: 1.2rem;
  }

  h1 {
    font-size: 1.4em;
  }

  h2 {
    font-size: 1.2em;
  }

  h3,
  h4 {
    font-size: 1em;
  }

  ul li {
    list-style: disc inside;
  }

  ul li.task-list-item {
    list-style: none;
  }

  ol li {
    list-style: decimal inside;
  }

  li ul,
  li ol,
  li {
    padding: 0.333rem 0;
  }

  li li {
    padding-left: 1rem;
  }

  pre {
    margin-bottom: 60px;
  }

  pre code {
    padding: 5px 10px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
  }

  a {
    color: inherit;
  }

  a:hover,
  a:active,
  a:focus {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.4);
    background-color: rgba(0, 0, 0, 0.1);
  }
`

export const DocsPage = ({ markdown }: { markdown: string }) => (
  <>
    {/* eslint-disable-next-line react/no-children-prop */}
    <Subtitle children="README.md" />
    {/* eslint-disable-next-line react/no-children-prop */}
    <Readme remarkPlugins={[remarkGfm]} children={markdown} />
    <Title />
    <Subtitle />
    <Description />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
  </>
)
