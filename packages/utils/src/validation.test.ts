import { expect, describe, test } from '@jest/globals'

import { isError, hasOwnProperty } from './validation'

describe('validation', () => {
  test('check hasOwnProperty', () => {
    const obj = { a: 1, b: 2 }
    expect(hasOwnProperty(obj, 'a')).toBe(true)
    expect(hasOwnProperty(obj, 'c')).toBe(false)
    expect(hasOwnProperty({ ...obj, c: { x: 1, y: 2, z: 3 } }, 'x')).toBe(false)
    expect(hasOwnProperty({}, 'a')).toBe(false)
    expect(hasOwnProperty([], 'a')).toBe(false)
    expect(hasOwnProperty(true, 'a')).toBe(false)
    expect(hasOwnProperty(1, 'a')).toBe(false)
    expect(hasOwnProperty(() => ({ a: 1 }), 'a')).toBe(false)
    expect(hasOwnProperty('string', 's')).toBe(false)
  })

  test('check isError', () => {
    expect(isError('string')).toBe(false)
    expect(isError(new Error())).toBe(false)
    expect(isError(new Error('message'))).toBe(true)

    const onceError = {
      name: 'errorName',
      message: 'errorMessage',
      trace: { foo: 'bar' },
    }
    expect(isError(onceError)).toBe(false)
    expect(isError(new Error(onceError.message))).toBe(true)

    expect(new Error() instanceof Error).toBe(true)
    const someError = new Error('message')
    expect((isError(someError) ? someError : 'string') instanceof Error).toBe(
      true
    )
    const someNotError = { message: 'string' }
    expect(
      (isError(someNotError) ? someNotError : 'string') instanceof Error
    ).toBe(false)
  })
})
