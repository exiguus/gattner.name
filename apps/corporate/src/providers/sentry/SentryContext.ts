import { createContext } from 'react'

export type SentryContextProps = {
  sentryWithExtras: (feature: string, error: Error, extras?: unknown) => void
}

export const defaultProps: SentryContextProps = {
  sentryWithExtras: () => undefined,
}

export const SentryContext = createContext<SentryContextProps>(defaultProps)
