import React, { FunctionComponent, useCallback, useMemo } from 'react'
import { SentryContext, SentryContextProps } from './SentryContext'
import { client, setExtrasFromError, setExtrasFromExtras } from './lib'

export const SentryContextProvider: FunctionComponent = ({ children }) => {
  const sentry = useMemo(() => client(), [])
  const sentryWithExtras = useCallback(
    (feature: string, error: Error, extras?: unknown) => {
      if (sentry === null) return

      sentry.withScope(scope => {
        scope.setTag('feature', feature)

        setExtrasFromError(scope, error)

        if (extras) {
          setExtrasFromExtras(scope, extras)
        }

        scope.report(error)
      })
    },
    [sentry]
  )

  // Create context value
  const value: SentryContextProps = {
    sentryWithExtras,
  }

  return (
    <SentryContext.Provider value={value}>{children}</SentryContext.Provider>
  )
}
