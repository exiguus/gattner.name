import merge from './merge'

describe('merge', () => {
  const object1 = {
    array: ['a'],
    date: new Date('2020-01-01'),
    functions: {
      func1: (): string => 'Object 1',
      func2: (): string => 'Object 1',
    },
    nest: {
      nest: {
        a: 1,
        b: 2,
      },
    },
    object: {
      a: 1,
      b: 2,
    },
  }
  const object1Backup = { ...object1 }

  const object2 = {
    nest: {
      nest: {
        b: 3,
        d: 5,
      },
    },
    object: {
      b: undefined,
      c: 3,
      d: 5,
    },
  }
  const object2Backup = { ...object2 }

  const object3 = {
    array: ['b', 'c', 'a'],
    date: new Date('2020-01-02'),
    functions: {
      func2: (): string => 'Object 3',
      func3: (): string => 'Object 3',
    },
    nest: {
      nest: {
        c: 4,
      },
    },
    object: {
      d: null,
    },
  }
  const object3Backup = { ...object3 }

  describe('without options', () => {
    const result = merge(object1, object2, object3)

    test('merges objects with functions correctly', () => {
      expect(Object.keys(result.functions)).toEqual(['func1', 'func2', 'func3'])

      expect(result.functions.func1()).toBe('Object 1')
      expect(result.functions.func2()).toBe('Object 3')
      expect(result.functions.func3()).toBe('Object 3')
    })

    test('merges nested objects correctly', () => {
      expect(result.nest).toEqual({
        nest: {
          a: 1,
          b: 3,
          c: 4,
          d: 5,
        },
      })
    })

    test('merges objects with undefined values correctly', () => {
      expect(result.object).toEqual({
        a: 1,
        c: 3,
        d: null,
      })
    })

    test("doesn't mutate the arguments", () => {
      expect(object1).toEqual(object1Backup)
      expect(object2).toEqual(object2Backup)
      expect(object3).toEqual(object3Backup)
    })

    test('overrides date correctly', () => {
      expect(result.date).toEqual(object3.date)
    })

    test('retains Date instance', () => {
      expect(result.date instanceof Date).toBe(true)
    })
  })
})
