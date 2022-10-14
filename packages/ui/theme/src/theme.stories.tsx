import React, { FunctionComponent, useEffect, useState } from 'react'
import styled, { ThemeProvider as OriginThemeProvider } from 'styled-components'
import { Meta, Story } from '@storybook/react'
import { DocsPage } from '@gattner/storybook'
import '@gattner/types'
import Readme from '../README.md'
import { GlobalStyles, lightTheme, darkTheme, Theme } from '.'

const StyledStory = styled.div`
  * {
    margin-bottom: 1em;
  }
`

const StyledHeadline = styled.h2`
  font-size: 2em;
`

const StyledDescription = styled.h3`
  font-size: 1.2em;
`

const StyledStrong = styled.strong`
  padding: 0 0.2666em;
  color: ${(props): string => props.theme.application.color};
`

const StyledCode = styled.code`
  padding: 0 0.2666em;
  color: ${(props): string => props.theme.application.color};
  background-color: ${(props): string =>
    props.theme.application.highlightColor};
`

type ThemeProviderProps = { theme: Theme }

const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ theme }) => {
  const [headlineStyle, setHeadlineStyle] =
    useState<CSSStyleDeclaration | null>(null)
  useEffect(() => {
    const styles = window.getComputedStyle(window.document.body)
    setHeadlineStyle(styles)
  }, [])
  return (
    <OriginThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledStory>
        <StyledHeadline>{theme.name.toUpperCase()} Theme</StyledHeadline>
        <StyledDescription>Body CSS Declaration </StyledDescription>
        {headlineStyle &&
          Object.values(headlineStyle).map(value => (
            <div key={`headlineStyles-${value}`}>
              <StyledStrong>{value}:</StyledStrong>{' '}
              {headlineStyle.getPropertyValue(value) && (
                <StyledCode>{headlineStyle.getPropertyValue(value)}</StyledCode>
              )}
            </div>
          ))}
      </StyledStory>
    </OriginThemeProvider>
  )
}

const Template: Story<ThemeProviderProps> = (args: { theme: Theme }) => (
  <ThemeProvider {...args} />
)

export const LightTheme = Template.bind({})
LightTheme.args = {
  theme: lightTheme,
}

export const DarkTheme = Template.bind({})
DarkTheme.args = {
  theme: darkTheme,
}

export default {
  title: 'Templates/Theme',
  description: 'dark and light styled-components theme',
  component: ThemeProvider,
  parameters: {
    docs: {
      page: () => <DocsPage markdown={Readme} />,
    },
  },
} as Meta
