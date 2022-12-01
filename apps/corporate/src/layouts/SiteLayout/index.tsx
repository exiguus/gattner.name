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
      {/* <button
          onClick={() =>
            setDarkMode({ timestamp: Date.now(), darkMode: !darkMode })
          }
        >
          Toggle
        </button> */}
      {children}
    </ThemeContextProvider>
  )
}

export { SiteLayout }
