import { jest, expect, describe, test } from '@jest/globals'

import { Helper } from './Helper.class'

describe('Helper class', () => {
  test('check Helper', () => {
    const helper = new Helper({ name: 'myName' })
    expect(helper.log).toBeDefined()
    expect(helper.throwError).toBeDefined()
  })

  test('check log', () => {
    jest.spyOn(console, 'info').mockImplementation(jest.fn())

    const helper = new Helper({ name: 'myName' })

    helper.log('message')
    expect(console.info).toHaveBeenCalledWith(
      '[45m[30m[2m[myName][0m[33m[2m: [0m[33mmessage[0m[33m[2m from (default `myName`)[0m'
    )

    helper.sourceName = 'mySource'
    helper.log('message')
    expect(console.info).toHaveBeenCalledWith(
      '[45m[30m[2m[myName][0m[33m[2m: [0m[33mmessage[0m[33m[2m from (mySource)[0m'
    )

    jest.spyOn(console, 'log').mockImplementation(jest.fn())
    helper.log('message', true, 'log')
    expect(console.log).toHaveBeenCalledWith(
      '[45m[30m[2m[myName][0m[33m[2m: [0m[33mundefined[0m[33m[2m from (mySource)[0m'
    )
    helper.log('[45m[30m[2m[myName][0m[33m[2m: [0m[33mundefined[0m[33m[2m from (mySource)[0m')
    expect(console.log).toHaveBeenCalledWith(
      '[45m[30m[2m[myName][0m[33m[2m: [0m[33mundefined[0m[33m[2m from (mySource)[0m'
    )
  })

  test('check throwError', () => {
    const helper = new Helper({ name: 'myName' })
    const throwMyError = () => {
      try {
        helper.throwError('message')
      } catch (error) {
        if (error) throw error
      }
    }
    expect(throwMyError).toThrow('[myName]: message from (default `myName`)')
    helper.sourceName = 'test'
    expect(throwMyError).toThrow('[myName]: message from (test)')

    const throwSomeError = () => {
      try {
        helper.throwError(new Error('message'))
      } catch (error) {
        if (error) throw error
      }
    }
    expect(throwSomeError).toThrow('[myName]: message from (test)')

    const throwNullError = () => {
      try {
        helper.throwError(null)
      } catch (error) {
        if (error) throw error
      }
    }
    expect(throwNullError).toThrow('[myName]: null from (test)')
  })
})
