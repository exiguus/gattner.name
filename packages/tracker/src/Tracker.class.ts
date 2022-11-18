import { defaultSettings } from './config'
import { Action, Settings, Options, ActionStoreItem, Api } from './types'

/**
 * @fileOverview Tracker Class.
 * @description Class to assign tracking and push log to a backend
 */

export default class Tracker {
  options: Options = null
  settings: Settings = defaultSettings
  store = new WeakMap<Action['key'], ActionStoreItem>()
  storage: Array<Action['key']> = []
  key: Action['key'] = { timestamp: Date.now() }
  value = {}
  count: number
  factor: number
  max: number
  api: Api | null = null
  error = false
  loading = false
  events = ['beforeunload', 'popstate', 'onhashchange']

  constructor(options: Options) {
    this.settings = {
      ...this.settings,
      ...options,
    }

    this.count = this.settings.count
    this.factor = this.settings.factor
    this.max = this.settings.max
    this.api = this.settings.api

    // this.bindEvents()
  }

  // bindEvents() {
  //   this.events.forEach(event => {
  //     window.addEventListener(event, async () => {
  //       this.clean()
  //     })
  //   })
  // }

  getStore() {
    return this.store.get(this.key)
  }

  set action(action: Action) {
    const { key, value, append } = action
    this.storage.push(key)
    this.store.set(key, {
      ...value,
      ...key,
      ...append,
    })
    this.key = key
    this.send()
  }

  get action() {
    return this.action
  }

  push(action: Action) {
    this.action = action
  }

  async clean() {
    const tmpCount = this.count
    this.count = 0
    await this.send()
    this.count = tmpCount
  }

  async send() {
    console.log({
      count: this.count,
      loading: this.loading,
      sl: this.storage.length,
    })
    if (!this.loading && this.storage.length > this.count) {
      this.loading = true
      const start = 0
      const end = this.storage.length
      console.log('addAction try')
      const inserts = this.storage
        .slice(start, end)
        .map(sendKey => {
          this.key = sendKey
          return this.store.get(sendKey)
        })
        .filter((item): item is ActionStoreItem => !!item)
      console.log({ inserts })
      if (this.api)
        this.api.send(inserts).then(({ error }) => {
          console.log('addAction then')
          this.error = error
          if (!error) this.storage.splice(start, end)
          const count = Math.round(this.count * (this.factor * 0.9))
          this.count = count >= this.max ? this.max : count
          if (this.storage.length > 256) {
            this.storage.splice(0, 56)
          }
          setTimeout(() => {
            this.loading = false
          }, this.settings.debounce)
        })
    }
  }
}
