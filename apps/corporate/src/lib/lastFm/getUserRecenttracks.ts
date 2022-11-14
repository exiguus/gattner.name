import { Workbox } from 'workbox-window'
import { baseURL, userName, apiKey } from './config'
import { fetch, FetchResult } from '../../utils/fetch'
import {
  UserRecenttracks,
  userRecenttracksSchema,
} from '../../../schemas/lastFm'

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
declare global {
  interface Window {
    sw: Record<string, Workbox>
  }
}

export const swRegisterUserRecenttracks = () => {
  if ('serviceWorker' in navigator) {
    window.sw = window.sw || {}
    window.sw.lastfm = new Workbox('/sw-lastfm.js')
    window.sw.lastfm.register()
  }
}

export const swMessageGetUserRecenttracks = async (): Promise<
  FetchResult<UserRecenttracks>
> => {
  if ('sw' in window && 'lastfm' in window.sw) {
    return await window.sw.lastfm.messageSW({ type: 'GET_TRACK' })
  } else {
    return await {
      result: 'request-failed',
      error: new Error('Service Worker not found'),
    }
  }
}
