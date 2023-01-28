// self refers to ServiceWorkerGlobalScope instead of window

import { UserRecenttracks } from 'schemas/lastFm'
import { getUserRecenttracks } from './lib/lastFm/getUserRecenttracks'
import { FetchResult } from './utils/fetch'
import fetchAdapter from '@vespaiach/axios-fetch-adapter'
import axios from 'axios'
import { isObject } from '@gattner/utils'
import { track } from './lib/tracker'

axios.defaults.adapter = fetchAdapter

export const lastfm = (self: ServiceWorkerGlobalScope) => {
  self.addEventListener('message', event => {
    const send = <T>(arg: T) => {
      event.ports[0].postMessage(arg)
    }
    if (isObject(event.data) && event.data.type === 'LASTFM_GET_TRACK') {
      getUserRecenttracks()
        .then(fr => {
          send<FetchResult<UserRecenttracks>>(fr)
          track({
            type: 'fetch',
            msg: 'LastFm fetched',
            value: `LastFm fetch user.getRecentTracks`,
          })
        })
        .catch(error => {
          send<FetchResult<UserRecenttracks>>({
            result: 'request-failed',
            error,
          })
          track({
            type: 'error',
            msg: 'LastFm error',
            value: `LastFm fetch user.getRecentTracks error request-failed`,
          })
        })
    }
  })
}
