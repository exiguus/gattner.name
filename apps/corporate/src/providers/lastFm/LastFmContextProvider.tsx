import { AxiosError } from 'axios'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  LastFmContext,
  LastFmContextProps,
  defaultProps,
} from './LastFmContext'
import {
  normalizeUserRecenttracks,
  UserRecenttrack,
} from '../../lib/lastFm/normalizeUserRecenttracks'
import { getTrack } from '../../lib/lastFm/getTrack'
import { UserRecenttracks } from 'schemas/lastFm'
import { useSentry } from '../../hooks/useSentry'

export const LastFmContextProvider: FunctionComponent = ({ children }) => {
  const { sentryWithExtras } = useSentry()

  const [userRecenttrack, setUserRecenttrack] = useState<UserRecenttrack>()
  const [pendingRequests, setPendingRequests] = useState(0)
  const [error, setError] = useState<Error>()

  // Helper to update hook state
  const update = useCallback(
    (
      userRecenttracks: UserRecenttracks | undefined,
      error?: Error | AxiosError,
      data?: unknown
    ) => {
      // only update on successful response
      setUserRecenttrack(
        userRecenttracks
          ? normalizeUserRecenttracks(userRecenttracks)
          : defaultProps.userRecenttrack
      )

      setError(error)

      // Generate a error message
      if (error) {
        let message

        if (error.message.includes('Network Error')) {
          // 'Network Error' is implemented by Axios
          message = 'Network error'
        } else {
          message = 'Something went wrong'
        }

        if (process.env.NODE_ENV === 'development' && error) {
          console.error('LastFM provider', error, data)
        }

        sentryWithExtras('LastFm Provider', error, data)
        return message
      }
    },
    [sentryWithExtras]
  )

  // Initialize
  useEffect(() => {
    let isMounted = true
    setPendingRequests(n => n + 1)

    getTrack().then(fr => {
      if (!isMounted) return // do not update state if component is not mounted anymore

      if (fr.result === 'successful') {
        update(fr.data)
      } else {
        update(undefined, fr.error, fr.data)
      }

      setPendingRequests(n => n - 1)
    })

    return () => {
      isMounted = false
    }
  }, [update])

  // Create context value
  const value: LastFmContextProps = {
    error,
    pendingRequests,
    userRecenttrack: userRecenttrack,
    hasUserRecenttrack: !!userRecenttrack,
    isPending: pendingRequests > 0,
  }

  return (
    <LastFmContext.Provider value={value}>{children}</LastFmContext.Provider>
  )
}
