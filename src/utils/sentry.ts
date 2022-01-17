import * as Sentry from '@sentry/browser'

export function sentrySetup() {
  const sentryDSN = process.env.SENTRY_DSN
  const sentryRelease =
    document.head
      .querySelector('meta[name="release"]')
      ?.getAttribute('content') ?? `${new Date(document.lastModified)}`
  const environment = process.env.NODE_ENV || 'development'

  if (!sentryDSN) return

  Sentry.init({
    dsn: sentryDSN,
    environment,
    release: `gattner.name@${sentryRelease}`,
    denyUrls: [/safari-extension:/, /-extension:\(?\/\//],
    ignoreErrors: [
      /Failed to execute 'deleteRule' on 'CSSStyleSheet'/i,
      /CSSStyleSheet\.deleteRule(.*)number of rules is only/i,
      /a\[b\]\.target\.className\.indexOf\(ac\)/,
      /a\[b\]\.target\.className\.indexOf\(bc\)/,
      /ResizeObserver loop/i,
      /instantSearchSDKJSBridgeClearHighlight/,
      /window\.webkit\.messageHandlers/,
    ],
    beforeSend(event, hint) {
      const error = hint?.originalException
      if (error && typeof error === 'object' && error.message) {
        if (/Loading chunk/i.test(error.message)) {
          event.fingerprint = ['chunk-load-error']
        } else if (/^Network Error$/i.test(error.message)) {
          event.fingerprint = ['network-error-connection-lost']
        }
      }
      return event
    },
  })
}
