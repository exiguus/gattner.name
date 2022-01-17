import { removeEmpty, DEPTH } from './useSentry'

describe('useSentry', () => {
  test('removeEmpty', () => {
    const obj = {
      string: 'value',
      number: 100,
      empty: '',
      undefined: undefined,
      null: null,
      object: {},
      array: [],
    }

    expect(removeEmpty(obj)).toEqual({
      string: 'value',
      number: 100,
      empty: '',
      object: {},
      array: [],
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
        empty: '',
        object: {},
        array: [],
      },
      b: {
        c: {
          string: 'value',
          number: 100,
          empty: '',
          object: {},
          array: [],
        },
      },
    })

    const deepObject = [...Array(DEPTH + 1).keys()].reduce(
      (prev, current) => ({ [current]: { ...prev } }),
      {}
    )
    try {
      expect(removeEmpty(deepObject)).toEqual({})
    } catch (error) {
      expect((error as Error).message).toEqual(
        `Too much recursion depth. Depth max is ${DEPTH} for removeEmpty`
      )
    }
  })
})
