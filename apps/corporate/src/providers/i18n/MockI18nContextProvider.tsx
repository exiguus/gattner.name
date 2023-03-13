import React, { FunctionComponent } from 'react'
import { I18nContext, I18nContextProps, defaultProps } from '.'

export const MockI18nContextProvider: FunctionComponent<
  Partial<I18nContextProps>
> = ({ lang = 'en', client = null, t = (k: string) => k, children }) => (
  <I18nContext.Provider value={{ ...defaultProps, ...{ lang, client, t } }}>
    {children}
  </I18nContext.Provider>
)
