/*
 * Ref: Deep Merge by voodoocreation
 *  https://github.com/voodoocreation/ts-deepmerge/blob/master/src/index.ts
 */

interface DraftObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

const isObject = (obj: unknown) => {
  if (typeof obj === 'object' && obj !== null) {
    if (typeof Object.getPrototypeOf === 'function') {
      const prototype = Object.getPrototypeOf(obj)
      return prototype === Object.prototype || prototype === null
    }

    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  return false
}

const merge = <T extends DraftObject[]>(
  ...objects: T
): UnionToIntersection<T[number]> =>
  objects.reduce((result, current) => {
    Object.keys(current).forEach(key => {
      if (isObject(result[key]) && isObject(current[key])) {
        result[key] = merge(result[key], current[key])
      } else {
        result[key] = current[key]
      }
    })

    return result
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {}) as any

export default merge
