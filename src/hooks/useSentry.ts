import { BrowserMicroSentryClient as Scope } from '@micro-sentry/browser'
import { sentrySetup } from '../utils/sentry'

export const DEPTH = 10

export function sentryWithExtras(
  feature: string,
  error: Error,
  extras?: unknown
) {
  const sentry = sentrySetup()
  if (!sentry) return

  sentry.withScope(scope => {
    scope.setTag('feature', feature)

    setExtrasFromError(scope, error)

    if (extras) {
      setExtrasFromExtras(scope, extras)
    }

    scope.report(error)
  })
}

function setExtrasFromError(scope: Scope, error: Error) {
  if (error && typeof error === 'object') {
    const entries = Object.entries(error)
    entries.forEach(([key, value]) => {
      scope.setExtra(key, value)
    })
  }
}

function setExtrasFromExtras(scope: Scope, extras: unknown) {
  try {
    const normalizedExtras = removeEmpty(
      typeof extras === 'object' && extras != null ? extras : { extras }
    )
    const entries = Object.entries(normalizedExtras)
    entries.forEach(([key, value]) => {
      if (value) {
        scope.setExtra(key, value)
      }
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.warn(error)
  }
}

let depth = 0
// eslint-disable-next-line @typescript-eslint/ban-types
const wrapperDepth = (max: number, fn: Function, args?: Array<unknown>) => {
  if (++depth > max) {
    throw new Error(
      `Too much recursion depth. Depth max is ${max} for ${fn.name}`
    )
  }
  const out = args ? fn(...args) : fn()
  depth--
  return out
}

export const removeEmpty = (obj: object): object =>
  Object.entries(obj)
    .filter(([_, v]) => v != null)
    .reduce(
      (acc, [k, v]) => ({
        ...acc,
        [k]:
          v === Object(v) && !Array.isArray(v)
            ? wrapperDepth(DEPTH, removeEmpty, [v])
            : v,
      }),
      {}
    )
