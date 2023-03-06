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
  }

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
    if (!this.loading && this.storage.length > this.count) {
      this.loading = true
      const start = 0
      const end = this.storage.length
      const inserts = this.apiInserts(start, end)
      const callback = () => this.apiSendCallback(start, end)
      this.apiSend(inserts, callback)
    }
  }

  apiInserts(start: number, end: number) {
    return this.storage
      .slice(start, end)
      .map(sendKey => {
        this.key = sendKey
        return this.store.get(sendKey)
      })
      .filter((item): item is ActionStoreItem => !!item)
  }

  async apiSend(inserts: Array<ActionStoreItem>, callback: () => void) {
    if (!this.api) return
    this.api.send(inserts).then(({ error }) => {
      this.error = error
      callback()
    })
  }

  apiSendCallback(start: number, end: number) {
    if (!this.error) this.storage.splice(start, end)
    const count = Math.round(this.count * (this.factor * 0.9))
    this.count = count >= this.max ? this.max : count
    if (this.storage.length > 256) {
      this.storage.splice(0, 56)
    }
    setTimeout(() => {
      this.loading = false
    }, this.settings.debounce)
  }
}
