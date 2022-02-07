import React, { FunctionComponent } from 'react'
import { SentryContext, SentryContextProps, defaultProps } from '.'

export const MockSentryContextProvider: FunctionComponent<
  Partial<SentryContextProps>
> = ({
  children,
  sentryWithExtras = (feature: string, error: Error, extras?: unknown) =>
    console.log(feature, error, extras),
}) => (
  <SentryContext.Provider value={{ ...defaultProps, sentryWithExtras }}>
    {children}
  </SentryContext.Provider>
)
