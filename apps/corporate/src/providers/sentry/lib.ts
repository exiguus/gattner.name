import { BrowserMicroSentryClient as Sentry } from '@micro-sentry/browser'
import { removeEmpty } from '../../utils/removeEmpty'

export const RELEASE_NAMESPACE = 'gattner.name@'

export const client = () => {
  const dsn = process.env.SENTRY_DSN
  if (!dsn) return null

  const release = getRelease()
  const environment = process.env.NODE_ENV || 'development'

  return new Sentry({
    dsn,
    environment,
    release,
    blacklistUrls: [/safari-extension:/, /-extension:\(?\/\//],
    ignoreErrors: [
      /Failed to execute 'deleteRule' on 'CSSStyleSheet'/i,
      /CSSStyleSheet\.deleteRule(.*)number of rules is only/i,
      /a\[b\]\.target\.className\.indexOf\(ac\)/,
      /a\[b\]\.target\.className\.indexOf\(bc\)/,
      /ResizeObserver loop/i,
      /instantSearchSDKJSBridgeClearHighlight/,
      /window\.webkit\.messageHandlers/,
    ],
  })
}

export const getRelease = (): string => {
  return `${RELEASE_NAMESPACE}${
    process.env.NODE_ENV === 'development'
      ? '1.0.0-dev'
      : document.head
          .querySelector('meta[name="release"]')
          ?.getAttribute('content') ?? `1.0.0-prod`
  }`
}

export function setExtrasFromError(sentry: Sentry, error: Error) {
  if (error && typeof error === 'object') {
    const { name, message, stack } = error
    sentry.setExtra('errorName', name)
    sentry.setExtra('errorMessage', message)
    if (stack) sentry.setExtra('errorStack', stack)
  }
}

export function setExtrasFromExtras(sentry: Sentry, extras: unknown) {
  try {
    const normalizedExtras = removeEmpty(
      typeof extras === 'object' && extras != null ? extras : { extras }
    )
    const entries = Object.entries(normalizedExtras)
    entries.forEach(([key, value]) => {
      if (value) {
        sentry.setExtra(key, value)
      }
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.warn(error)
  }
}
