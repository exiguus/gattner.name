import { baseURL, userName, apiKey } from './config'
import { fetch, FetchResult } from '../../utils/fetch'
import {
  UserRecenttracks,
  userRecenttracksSchema,
} from '../../../schemas/lastFm'
import Store from '@gattner/storage'
import { validate } from '../../utils/validate'

export const CACHE_TIME = 60 * 1000 * 3
/**
 * Get the recent played tracks from a user.
 */

type UserRecenttracksRequest = {
  method: 'user.getRecentTracks'
  user: string
  api_key: string
  limit: number
  nowplaying: boolean
  format: 'json'
}
export const getUserRecenttracks = async () => {
  return await fetch<UserRecenttracksRequest, UserRecenttracks>({
    query: `${baseURL}/2.0/`,
    request: {
      method: 'user.getRecentTracks',
      user: userName,
      api_key: apiKey,
      limit: 1,
      nowplaying: true,
      format: 'json',
    },
    method: 'get',
    responseSchema: userRecenttracksSchema,
  })
}

/**
 * Get the recent played tracks from a user via service worker.
 */

export const swMessageGetUserRecenttracks = async (): Promise<
  FetchResult<UserRecenttracks>
> => {
  if ('sw' in window) {
    return await window.sw.messageSW({ type: 'LASTFM_GET_TRACK' })
  } else {
    return await {
      result: 'request-failed',
      error: new Error('Service Worker not found'),
    }
  }
}

export const storePullGetUserRecenttracks = async (
  store: Store
): Promise<FetchResult<UserRecenttracks>> => {
  const { timestamp, data } = store.last() || {}
  const validCache =
    Date.now() - (typeof timestamp === 'number' ? timestamp : 0) < CACHE_TIME

  if (data) {
    try {
      validate<UserRecenttracks>(userRecenttracksSchema, data)
    } catch (error) {
      return {
        result: 'response-schema-unexpected',
        data,
        error:
          error instanceof Error ? error : new Error(`fetch failed: ${error}`),
      }
    }
  }

  if (data && validCache) {
    return Promise.resolve({
      result: 'successful',
      data: data as UserRecenttracks,
    })
  } else {
    return Promise.resolve({
      result: 'request-failed',
      error: new Error('No data found'),
    })
  }
}
