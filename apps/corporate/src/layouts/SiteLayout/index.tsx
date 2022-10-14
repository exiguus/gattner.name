import React, { FunctionComponent, ReactNode } from 'react'
import { ThemeContextProvider } from '../../providers/theme'

import { GlobalStyles } from '@gattner/ui-theme'

interface SiteLayoutProps {
  children: ReactNode
}

const SiteLayout: FunctionComponent<SiteLayoutProps> = ({ children }) => {
  return (
    <ThemeContextProvider>
      <GlobalStyles />
      {children}
    </ThemeContextProvider>
  )
}

export { SiteLayout }
