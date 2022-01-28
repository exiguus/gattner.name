import { getRandomInt, isArray, isObject, sortObject } from '.'

describe('utils', () => {
  describe('getRandomInt', () => {
    test('is number between min and max', () => {
      const min = 5
      const max = 10
      const randomInt = getRandomInt(min, max)

      expect(Number.isInteger(randomInt)).toBe(true)
      expect(typeof randomInt === 'number').toBe(true)
      expect(randomInt >= min && randomInt <= max).toBe(true)
      expect(getRandomInt(1.5, 1.23344)).toBe(1)
      expect(getRandomInt(NaN, 10)).toBe(NaN)
      expect(getRandomInt(5, 4)).toBe(4)
    })
  })

  describe('sortObject', () => {
    const obj = {
      c: 'c',
      b: 'b',
      a: 'a',
    }
    const objSorted = { a: 'a', b: 'b', c: 'c' }

    test('sort objects', () => {
      expect(sortObject(obj)).toEqual(objSorted)

      expect(sortObject({})).toEqual({})

      const g = () => true
      expect(
        sortObject({
          h: g(),
          g,
          f: undefined,
          e: 123,
          d: { key: 'value' },
          c: [1, 2, 3],
          b: 'string',
          a: null,
        })
      ).toEqual({
        a: null,
        b: 'string',
        c: [1, 2, 3],
        d: { key: 'value' },
        e: 123,
        f: undefined,
        g,
        h: g(),
      })

      expect(sortObject({ 3: 3, 2: 2, 1: 1 })).toEqual({ 1: 1, 2: 2, 3: 3 })

      expect(sortObject({ 3: 3, b: 'b', 'a-a': 'aa' })).toEqual({
        3: 3,
        'a-a': 'aa',
        b: 'b',
      })
    })

    test('deep sort objects', () => {
      expect(sortObject({ b: 'b', a: obj })).toEqual({ a: objSorted, b: 'b' })

      const g = () => true
      expect(
        sortObject({
          d: {
            h: g(),
            g,
            f: undefined,
            e: 123,
            d: { key: 'value' },
            c: [1, 2, 3],
            b: 'string',
            a: null,
          },
          c: { b: 'b', a: obj },
          b: obj,
          a: 'a',
        })
      ).toEqual({
        a: 'a',
        b: objSorted,
        c: {
          a: objSorted,
          b: 'b',
        },
        d: {
          a: null,
          b: 'string',
          c: [1, 2, 3],
          d: { key: 'value' },
          e: 123,
          f: undefined,
          g,
          h: g(),
        },
      })
    })
  })

  test('isArray', () => {
    expect(isArray([1, 2, 3])).toEqual(true)
    expect(isArray([null, undefined, { foo: 'bar' }, [1, 2, 3]])).toEqual(true)
    expect(isArray(undefined)).toEqual(false)
    expect(isArray(null)).toEqual(false)
    expect(isArray('string')).toEqual(false)
    expect(isArray(42)).toEqual(false)
    expect(isArray(NaN)).toEqual(false)
    expect(isArray({ foo: 'bar' })).toEqual(false)
    expect(isArray(() => [1, 2, 3])).toEqual(false)
  })

  test('isObject', () => {
    expect(isObject({ foo: 'bar' })).toEqual(true)
    expect(isObject({ foo: { foo: 'bar' }, bar: [1, 2, 3] })).toEqual(true)
    expect(isObject(undefined)).toEqual(false)
    expect(isObject(null)).toEqual(false)
    expect(isObject('string')).toEqual(false)
    expect(isObject(42)).toEqual(false)
    expect(isObject(NaN)).toEqual(false)
    expect(isObject([1, 2, 3])).toEqual(false)
    expect(
      isObject(() => {
        'bar'
      })
    ).toEqual(false)
  })
})
