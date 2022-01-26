import { BrowserMicroSentryClient as Sentry } from '@micro-sentry/browser'

export function sentrySetup() {
  const sentryDSN = process.env.SENTRY_DSN
  const sentryRelease =
    process.env.NODE_ENV === 'development'
      ? '1.0.0-dev'
      : document.head
          .querySelector('meta[name="release"]')
          ?.getAttribute('content') ?? `${new Date(document.lastModified)}`
  const environment = process.env.NODE_ENV || 'development'

  if (!sentryDSN) return

  return new Sentry({
    dsn: sentryDSN,
    environment,
    release: `gattner.name@${sentryRelease}`,
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
