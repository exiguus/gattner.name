import * as v from '@badrap/valita'

export const validate = <T>(schema: v.Type, data: unknown): T | undefined => {
  try {
    const result = schema.parse(data)
    return result as T
  } catch (error) {
    console.warn(error instanceof Error ? error.message : error, {
      error,
      data,
      schema,
    })
    if (error instanceof Error) {
      throw error
    }
  }
}
