import { isObject, isArray } from '.'
export const WRAPPER_DEPTH = 10

let wrapper_depth = 0
const wrapDepth = (
  max: number,
  // eslint-disable-next-line @typescript-eslint/ban-types
  fn: Function,
  args?: Array<unknown>
) => {
  if (++wrapper_depth > max) {
    throw new Error(
      `Too much recursion. WRAPPER_DEPTH max is ${max} for ${fn.name}`
    )
  }
  const out = args ? fn(...args) : fn()
  wrapper_depth--
  return out
}

export const removeEmpty = (obj: object): object =>
  Object.entries(obj)
    .filter(([_, v]) => isNotEmpty(v))
    .reduce(
      (acc, [k, v]) => ({
        ...acc,
        [k]: isObject(v) ? wrapDepth(WRAPPER_DEPTH, removeEmpty, [v]) : v,
      }),
      {}
    )

export const isNotEmpty = (v: unknown): boolean => {
  return (
    typeof v === 'boolean' ||
    (typeof v === 'number' && !isNaN(v)) ||
    (typeof v === 'string' && v.length > 0) ||
    (isObject(v) && Object.keys(v).length > 0) ||
    (isArray(v) && v.length > 0)
  )
}
