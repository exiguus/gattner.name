import React, { FunctionComponent, ReactNode } from 'react'
import { I18nContextProvider } from '../../providers/i18n'
import { LastFmContextProvider } from '../../providers/lastFm'
import { SentryContextProvider } from '../../providers/sentry'
import { client } from '../../i18n/config'

interface AppLayoutProps {
  children: ReactNode
}

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
  if (
    process.env.MOCK_API_LAST_FM === 'enabled' &&
    process.env.NODE_ENV === 'development'
  ) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { worker } = require('../../../mocks/browser')
    worker.start()
  }
  return (
    <I18nContextProvider lang="en" client={client}>
      <SentryContextProvider>
        <LastFmContextProvider>{children}</LastFmContextProvider>
      </SentryContextProvider>
    </I18nContextProvider>
  )
}

export { AppLayout }
