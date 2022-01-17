import { baseURL, userName, apiKey } from './config'
import { fetch } from '../../utils/fetch'
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
