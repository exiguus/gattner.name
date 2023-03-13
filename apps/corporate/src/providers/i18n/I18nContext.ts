import { createContext } from 'react'
import { Client } from '../../lib/i18n'

export type Lang = 'en'
const translate = (key: string, lang?: Lang, fallback?: string) => key

export type I18nContextProps = {
  lang: Lang
  client: Client | null
  translate: typeof translate
  t: typeof translate
}

export const defaultProps: I18nContextProps = {
  lang: 'en',
  client: null,
  t: translate,
  translate,
}

export const I18nContext = createContext<I18nContextProps>(defaultProps)
