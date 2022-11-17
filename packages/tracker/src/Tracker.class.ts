import BrowserFingerprint from './BrowserFingerprint.class'

/**
 * @fileOverview Tracker Class.
 * @description Class to assign tracking and push log to a backend
 */

export type Action = {
  key: {
    timestamp: number
  }
  value: {
    type: string
    msg: string
    value: string
  }
}

export type Append = {
  pid: number
  name: string
  url: string
  navigator: string
  origin: string
  referrer: string
  fingerprint: number
}

export type Insert = Append & Action['value'] & Action['key']

export type Inserts = Array<Insert>

class Api {
  send(inserts: Insert[]): Promise<{ error: boolean }> {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        console.log({ inserts })
        resolve({ error: false })
      }, 1000)
    })
  }
}

export type Settings = {
  api: Api | null
  count: number
  factor: number
  max: number
  debounce: number
  append: Append
}

const browserFingerprint = new BrowserFingerprint()
console.log({ info: browserFingerprint.getBrowserInfo() })
const fingerprint = browserFingerprint.result()

const defaultSettings: Settings = {
  api: null,
  count: 3,
  factor: 1.333,
  max: 13,
  debounce: 4000,
  append: {
    pid: 1,
    name: 'default',
    url: window.location.href,
    navigator: `${navigator.userAgent || navigator.appVersion}`,
    origin: window.origin || document.location.origin,
    referrer: document.referrer,
    fingerprint,
  },
}

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P]
}

type Options = RecursivePartial<Settings> | null

type ActionStoreItem = Action['key'] & Action['value'] & Settings['append']

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
      ...{
        append: {
          ...this.settings.append,
          ...options?.append,
        },
      },
    }

    this.count = this.settings.count
    this.factor = this.settings.factor
    this.max = this.settings.max
    this.api = this.settings.api

    this.bindEvents()
  }

  bindEvents() {
    this.events.forEach(event => {
      window.addEventListener(event, async () => {
        this.clean()
      })
    })
  }

  getStore() {
    return this.store.get(this.key)
  }

  set action(action: Action) {
    const { key, value } = action
    this.storage.push(key)
    this.store.set(key, {
      ...this.settings.append,
      ...key,
      ...value,
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
