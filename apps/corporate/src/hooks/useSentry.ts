import { useContext } from 'react'
import { SentryContext } from '../providers/sentry'

export const useSentry = () => useContext(SentryContext)
