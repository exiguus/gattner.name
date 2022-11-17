import Tracker, { Action } from './Tracker.class'
import Api from './Api.class'
import axios from 'axios'
import 'whatwg-fetch'

let tracker = new Tracker({
  api: new Api(),
  count: 1,
  factor: 1.666,
  max: 14,
  debounce: 2300,
  append: {
    pid: 1,
    name: 'test-env',
  },
})

const track = (...args: Array<Action['value']>) => {
  const timestamps: Set<number> = new Set()
  if (tracker != null) {
    args.forEach(action => {
      const timestamp = Date.now()
      timestamps.add(timestamp)
      if (tracker != null) tracker.push({ key: { timestamp }, value: action })
    })
  }
  return Array.from(timestamps)
}

describe('Track Class', () => {
  beforeAll(() => {
    // Permit CORS in Axios, see https://github.com/axios/axios/issues/1754#issuecomment-572778305
    axios.defaults.adapter = require('axios/lib/adapters/http')
  })

  beforeEach(() => {
    tracker = new Tracker({
      api: new Api(),
      count: 1,
      factor: 1.666,
      max: 14,
      debounce: 2300,
      append: {
        pid: 1,
        name: 'test-env',
      },
    })
  })

  afterEach(() => {
    sessionStorage.clear()
    localStorage.clear()
  })

  test('create', () => {
    const timestamps = track({
      type: 'test',
      msg: 'create item',
      value: `test: create item`,
    })
    expect(Array.isArray(timestamps)).toBe(true)
    expect(JSON.stringify(tracker.getStore())).toBe(
      `{\"pid\":1,\"name\":\"test-env\",\"url\":\"http://localhost/\",\"navigator\":\"Mozilla/5.0 (linux) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/20.0.2\",\"origin\":\"http://localhost\",\"referrer\":\"\",\"fingerprint\":${
        tracker.getStore()?.fingerprint
      },\"timestamp\":${
        timestamps[0]
      },\"type\":\"test\",\"msg\":\"create item\",\"value\":\"test: create item\"}`
    )
    const [timestamp, ...other] = track({
      type: 'test',
      msg: 'create item',
      value: `test: create item`,
    })
    expect(tracker?.getStore()?.['timestamp']).toBe(timestamp)
    expect(other.length).toBe(0)
  })
})
