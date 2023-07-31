import React, { FunctionComponent, useContext } from 'react'
import { render, screen } from '../../../tests/testUtils'
import { MockI18nContextProvider, I18nContext } from '.'

const translations = {
  'music.listen.to': 'Listen to:',
}

const Component: FunctionComponent = () => {
  const useTranslate = () => useContext(I18nContext)
  const { t } = useTranslate()
  return (
    <>
      <div data-testid="key-defined">{t('music.listen.to')}</div>
      <div data-testid="key-undefined">{t('music.listen.not.to')}</div>
    </>
  )
}

describe('MockI18nContextProvider', () => {
  test('translation', async () => {
    render(
      <MockI18nContextProvider
        t={(key: string) => {
          if (key === 'music.listen.to') {
            return translations[key]
          } else {
            return key
          }
        }}
      >
        <Component />
      </MockI18nContextProvider>
    )

    const keyDefined = screen.getByTestId('key-defined')
    expect(keyDefined).toBeInTheDocument()
    expect(keyDefined.textContent).toEqual('Listen to:')

    const keyUndefined = screen.getByTestId('key-undefined')
    expect(keyUndefined).toBeInTheDocument()
    expect(keyUndefined.textContent).toEqual('music.listen.not.to')
  })
})
