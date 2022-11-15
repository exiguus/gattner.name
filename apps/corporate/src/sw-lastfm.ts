// self refers to ServiceWorkerGlobalScope instead of window

import { UserRecenttracks } from 'schemas/lastFm'
import { getUserRecenttracks } from './lib/lastFm/getUserRecenttracks'
import { FetchResult } from './utils/fetch'
import fetchAdapter from '@vespaiach/axios-fetch-adapter'
import axios from 'axios'

axios.defaults.adapter = fetchAdapter

//  origin: https://github.com/microsoft/TypeScript/issues/14877#issuecomment-493729050
declare let self: ServiceWorkerGlobalScope
// fix cannot find module error
export default null

const SW_VERSION = '1.0.0'
const SW_NAME = 'sw-lastfm'

self.addEventListener('message', event => {
  const send = <T>(arg: T) => {
    event.ports[0].postMessage(arg)
  }

  switch (event.data.type) {
    case 'GET_TRACK':
      getUserRecenttracks()
        .then(fr => {
          send<FetchResult<UserRecenttracks>>(fr)
        })
        .catch(error => {
          send<FetchResult<UserRecenttracks>>({
            result: 'request-failed',
            error,
          })
        })
      break
    case 'GET_VERSION':
      send(SW_VERSION)
      break
    case 'GET_NAME':
      send(SW_NAME)
      break
    default:
      send(SW_NAME)
      break
  }
})
