export const isArray = (v: unknown): v is [] => {
  return Array.isArray(v)
}

export const isObject = (v: unknown): v is Record<string, unknown> => {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

export const isError = (error: unknown): error is Error =>
  error instanceof Error &&
  typeof error === 'object' &&
  error != null &&
  // eslint-disable-next-line no-prototype-builtins
  hasOwnProperty(error, 'message') &&
  typeof error['message'] === 'string'

export function hasOwnProperty<
  // eslint-disable-next-line @typescript-eslint/ban-types
  X extends Object,
  Y extends PropertyKey
>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  // eslint-disable-next-line no-prototype-builtins
  return obj.hasOwnProperty(prop)
}
