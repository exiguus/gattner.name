import { isNotEmpty, removeEmpty, WRAPPER_DEPTH } from './removeEmpty'

describe('removeEmpty', () => {
  test('isNotEmpty', () => {
    expect(isNotEmpty(undefined)).toEqual(false)
    expect(isNotEmpty(null)).toEqual(false)
    expect(isNotEmpty(NaN)).toEqual(false)
    expect(isNotEmpty('')).toEqual(false)
    expect(isNotEmpty({})).toEqual(false)
    expect(isNotEmpty([])).toEqual(false)
    expect(isNotEmpty(() => 'string')).toEqual(false)
    expect(isNotEmpty(10)).toEqual(true)
    expect(isNotEmpty('foo')).toEqual(true)
    expect(isNotEmpty({ foo: 'bar' })).toEqual(true)
    expect(isNotEmpty([1, 2, 3])).toEqual(true)
    expect(
      isNotEmpty({ foo: [1, 2, 3], bar: [], baz: { foo: 'bar' }, yzzy: {} })
    ).toEqual(true)
    expect(isNotEmpty([undefined, null, [1, 2, 3], { foo: 'bar' }])).toEqual(
      true
    )
  })

  test('removeEmpty', () => {
    const obj = {
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
      func: () => 'string',
    }

    expect(removeEmpty(obj)).toEqual({
      string: 'value',
      number: 100,
      object: { foo: 'bar' },
      array: [1, 2, 3],
    })

    expect(
      removeEmpty({
        a: obj,
        b: {
          c: obj,
        },
      })
    ).toEqual({
      a: {
        string: 'value',
        number: 100,
        object: { foo: 'bar' },
        array: [1, 2, 3],
      },
      b: {
        c: {
          string: 'value',
          number: 100,
          object: { foo: 'bar' },
          array: [1, 2, 3],
        },
      },
    })

    const deepObject = [...Array(WRAPPER_DEPTH + 1).keys()].reduce(
      (prev, current) => ({ [current]: { ...prev } }),
      {}
    )
    try {
      expect(removeEmpty(deepObject)).toEqual({
        '10': {
          '9': {
            '8': {
              '7': { '6': { '5': { '4': { '3': { '2': { '1': {} } } } } } },
            },
          },
        },
      })
    } catch (error) {
      expect((error as Error).message).toEqual(
        `Too much recursion. WRAPPER_DEPTH max is ${WRAPPER_DEPTH} for removeEmpty`
      )
    }
  })
})
