import React, { FunctionComponent, ReactNode } from 'react'
import { LastFmContextProvider } from '../../providers/lastFm'
import { SentryContextProvider } from '../../providers/sentry'

interface AppLayoutProps {
  children: ReactNode
}

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { worker } = require('../../../mocks/browser')
    worker.start()
  }

  return (
    <SentryContextProvider>
      <LastFmContextProvider>{children}</LastFmContextProvider>
    </SentryContextProvider>
  )
}

export { AppLayout }
