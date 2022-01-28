import * as v from '@badrap/valita'
import { validate } from './validate'

describe('validate', () => {
  test('validate schema', () => {
    type SuccessDataType = {
      foo: string
    }
    const schema = v.object({
      foo: v.string(),
    })
    const data = {
      foo: 'bar',
    }

    expect(validate<SuccessDataType>(schema, data)).toEqual(data)

    try {
      expect(validate<SuccessDataType>(schema, { foo: [1, 2, 3] })).toEqual(
        undefined
      )
    } catch (error) {
      expect((error as Error).message).toEqual(
        'invalid_type at .foo (expected string)'
      )
    }

    try {
      expect(
        validate<SuccessDataType>(schema, { ...data, ...{ bar: 23 } })
      ).toEqual(undefined)
    } catch (error) {
      expect((error as Error).message).toEqual(
        'unrecognized_keys at . (unrecognized key "bar")'
      )
    }
  })
})
