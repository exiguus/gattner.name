import React, { FunctionComponent } from 'react'
import { SentryContext, SentryContextProps, defaultProps } from '.'

export const MockSentryContextProvider: FunctionComponent<
  Partial<SentryContextProps>
> = ({ children }) => (
  <SentryContext.Provider value={defaultProps}>
    {children}
  </SentryContext.Provider>
)
