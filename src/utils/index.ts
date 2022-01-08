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
          [k]:
            typeof obj[k] === 'object' &&
            obj[k] !== null &&
            !Array.isArray(obj[k])
              ? sortObject(obj[k] as unknown as Record<string, unknown>)
              : obj[k],
        }),
      {}
    )
}
