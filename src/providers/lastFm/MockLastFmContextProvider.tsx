import React, { FunctionComponent } from 'react'
import { LastFmContext, LastFmContextProps, defaultProps } from '.'

export const MockLastFmContextProvider: FunctionComponent<
  Partial<LastFmContextProps>
> = ({
  children,
  userRecenttrack = undefined,
  hasUserRecenttrack = false,
  isPending = false,
}) => (
  <LastFmContext.Provider
    value={{
      ...defaultProps,
      userRecenttrack,
      hasUserRecenttrack,
      isPending,
    }}
  >
    {children}
  </LastFmContext.Provider>
)
