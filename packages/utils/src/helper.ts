import { isObject } from './validation'

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

export const sortObject = (
  obj: Record<string, unknown>
): Record<string, unknown> => {
  return Object.keys(obj)
    .sort()
    .reduce(
      (r, k) =>
        Object.assign(r, {
          [k]: isObject(obj[k])
            ? sortObject(obj[k] as unknown as Record<string, unknown>)
            : obj[k],
        }),
      {}
    )
}

export async function waitFor(
  condition: () => boolean,
  name = 'waitFor',
  maxCount = 10
) {
  let interval: ReturnType<typeof setInterval>
  let count = 0
  return await new Promise(function (resolve, reject) {
    interval = setInterval(() => {
      if (condition()) {
        resolve(`${name}: resolved`)
        if (process.env.NODE_ENV === 'development')
          console.log({ name, i: 'resolve interval', c: condition() })
      } else {
        if (count > maxCount) reject(`${name}: rejected`)
      }
      count++
    })
  })
    .then(res => {
      if (process.env.NODE_ENV === 'development')
        console.log({ name, res, t: 'clear interval' })
      clearInterval(interval)
      return res
    })
    .catch(error => {
      if (process.env.NODE_ENV === 'development')
        console.log({ error, e: 'clear interval' })
      clearInterval(interval)
      return error
    })
}
