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

export const isArray = (v: unknown): v is [] => {
  return Array.isArray(v)
}

export const isObject = (v: unknown): v is Record<string, unknown> => {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}
