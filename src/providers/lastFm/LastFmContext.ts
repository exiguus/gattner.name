import { createContext } from 'react'
import { UserRecenttrack } from '../../lib/lastFm/normalizeUserRecenttracks'

export type LastFmContextProps = {
  error: Error | undefined
  pendingRequests: number
  userRecenttrack: UserRecenttrack | undefined
  hasUserRecenttrack: boolean
  isPending: boolean
}

export const defaultProps: LastFmContextProps = {
  error: undefined,
  pendingRequests: 0,
  userRecenttrack: 'muse - butterfly and hurricane',
  hasUserRecenttrack: false,
  isPending: true,
}

export const LastFmContext = createContext<LastFmContextProps>(defaultProps)
