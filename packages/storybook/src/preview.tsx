import React from 'react'
import { Story, Parameters } from '@storybook/react'
import { StoryIdentifier } from '@storybook/addons'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, lightTheme } from '@gattner/ui-theme'

export const decorators = [
  // Wrap story in ThemeProvider and add GlobalStyles
  (Story: Story) => (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
]

// See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#no-longer-pass-denormalized-parameters-to-storysort
type SortParams = Readonly<
  [
    storyId: string,
    storeItem: StoryIdentifier,
    kindParameters: Parameters,
    globalParameters: Parameters
  ]
>

export const parameters: Parameters = {
  options: {
    storySort: (a: SortParams, b: SortParams) => {
      // Sort the Welcome story to the top
      if (b[1].kind === 'UI/Story') {
        return 1
      }

      // See https://github.com/storybookjs/storybook/issues/548#issuecomment-530305279
      if (a[1].kind === b[1].kind) {
        return 0
      }

      const [sectionA] = a[1].kind.split('/')
      const [sectionB] = b[1].kind.split('/')

      if (sectionA === sectionB) {
        return a[1].id.localeCompare(b[1].id)
      }

      const sectionOrder = [
        'Atoms',
        'Molecules',
        'Organisms',
        'Templates',
        'Pages',
      ]
      return sectionOrder.indexOf(sectionA) - sectionOrder.indexOf(sectionB)
    },
    viewport: {
      viewports: {
        MobileS: {
          name: 'Mobile S',
          styles: {
            height: '568px',
            width: '320px',
          },
          type: 'mobile',
        },
        MobileM: {
          name: 'Mobile M',
          styles: {
            height: '812px',
            width: '375px',
          },
          type: 'mobile',
        },
        MobileL: {
          name: 'Mobile L',
          styles: {
            height: '756px',
            width: '425px',
          },
          type: 'mobile',
        },
        Tablet: {
          name: 'Tablet',
          styles: {
            height: '1024px',
            width: '768px',
          },
          type: 'tablet',
        },
        Laptop: {
          name: 'Laptop',
          styles: {
            height: '768px',
            width: '1024px',
          },
          type: 'desktop',
        },
        LaptopL: {
          name: 'Laptop L',
          styles: {
            height: '900px',
            width: '1440px',
          },
          type: 'desktop',
        },
      },
    },
  },
}
