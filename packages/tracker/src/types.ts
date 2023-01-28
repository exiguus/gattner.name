import { RecursivePartial } from '@gattner/utils'

export type Action = {
  key: {
    timestamp: number
  }
  value: {
    type: string
    msg: string
    value: string
  }
  append: Append
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

export type Insert = Action['append'] & Action['value'] & Action['key']

export type Inserts = Array<Insert>

export class Api {
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
}

export type Options = RecursivePartial<Settings> | null

export type ActionStoreItem = Action['key'] & Action['value'] & Action['append']
