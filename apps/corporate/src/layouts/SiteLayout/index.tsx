import React, { FunctionComponent, ReactNode } from 'react'
import { ThemeContextProvider } from '../../providers/theme'
import { GlobalStyles } from '../../components/GlobalStyles'

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
