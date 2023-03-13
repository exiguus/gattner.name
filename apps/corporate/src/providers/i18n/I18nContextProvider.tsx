import React, { FunctionComponent, useCallback } from 'react'
import { I18nContext, I18nContextProps } from './I18nContext'

export const I18nContextProvider: FunctionComponent<
  Pick<I18nContextProps, 'lang' | 'client'>
> = ({ lang, client, children }) => {
  if (client) client.init(lang)

  const t = useCallback(
    (key: string, lang?: string, fallback?: string) => {
      if (client === null) return key

      return client.t(key, lang, fallback)
    },
    [client]
  )

  // Create context value
  const value: I18nContextProps = {
    lang: 'en',
    client,
    translate: t,
    t,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
