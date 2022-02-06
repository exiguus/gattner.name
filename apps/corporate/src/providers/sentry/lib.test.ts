import { BrowserMicroSentryClient } from '@micro-sentry/browser'
import {
  client,
  getRelease,
  RELEASE_NAMESPACE,
  setExtrasFromError,
  setExtrasFromExtras,
} from './lib'

const date = `${new Date().toISOString()}`

const getExampleDocument = () => {
  const meta = document.createElement('meta')
  meta.setAttribute('name', 'release')
  meta.setAttribute('content', date)
  document.head.append(meta)
  return document
}

describe('lib sentry', () => {
  test('client', () => {
    expect(typeof client() === 'object').toBe(true)
  })

  test('getRelease', () => {
    expect(typeof getRelease() === 'string').toBe(true)
    expect(getRelease()).toEqual(`${RELEASE_NAMESPACE}1.0.0-prod`)

    const nodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
    expect(getRelease()).toEqual(`${RELEASE_NAMESPACE}1.0.0-dev`)
    process.env.NODE_ENV = nodeEnv

    const document = getExampleDocument()
    expect(document.querySelector('meta')?.getAttribute('content')).toEqual(
      date
    )
    expect(getRelease()).toEqual(`${RELEASE_NAMESPACE}${date}`)
  })

  class MockBrowserMicroSentryClient {
    private _extras: Record<string, unknown> | null = null

    get extras(): Record<string, unknown> | null {
      return this._extras
    }

    set extras(value: Record<string, unknown> | null) {
      this._extras = { ...value, ...this._extras }
    }

    setTags(tags: string): this {
      return this
    }

    setTag(key: string, value: string): this {
      return this
    }

    setExtra(key: string, value: string): this {
      this.extras = { ...{ [key]: value }, ...this.extras }
      return this
    }

    setExtras(extras: Record<string, unknown>): this {
      this.extras = { ...extras, ...this.extras }
      return this
    }
    withScope(fn: (client: MockBrowserMicroSentryClient) => void): void {
      return
    }
  }

  test('setExtrasFromError', () => {
    const client = new MockBrowserMicroSentryClient()
    expect(
      setExtrasFromError(
        client as unknown as BrowserMicroSentryClient,
        new Error('test')
      )
    ).toBe(undefined)
    expect(client.extras?.errorName).toEqual('Error')
    expect(client.extras?.errorMessage).toEqual('test')
    expect(client.extras?.errorStack).toMatch('at Object')
  })

  test('setExtrasFromExtra', () => {
    const client = new MockBrowserMicroSentryClient()
    const extra = {
      string: 'value',
      number: 100,
      NaN: NaN,
      empty: '',
      undefined: undefined,
      null: null,
      emptyObject: {},
      emptyArray: [],
      object: { foo: 'bar' },
      array: [1, 2, 3],
    }
    const extras = {
      a: extra,
      b: {
        a: extra,
        b: extra,
      },
      c: Object.keys(extra),
    }

    expect(
      setExtrasFromExtras(client as unknown as BrowserMicroSentryClient, extras)
    ).toBe(undefined)
    expect(client.extras).toEqual({
      c: [
        'string',
        'number',
        'NaN',
        'empty',
        'undefined',
        'null',
        'emptyObject',
        'emptyArray',
        'object',
        'array',
      ],
      b: {
        a: {
          string: 'value',
          number: 100,
          object: { foo: 'bar' },
          array: [1, 2, 3],
        },
        b: {
          string: 'value',
          number: 100,
          object: { foo: 'bar' },
          array: [1, 2, 3],
        },
      },
      a: {
        string: 'value',
        number: 100,
        object: { foo: 'bar' },
        array: [1, 2, 3],
      },
    })
  })
})
