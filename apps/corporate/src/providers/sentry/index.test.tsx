import React, { FunctionComponent, useEffect } from 'react'
import { render, screen } from '../../../tests/testUtils'
import { MockSentryContextProvider, SentryContextProvider } from '.'
import { useSentry } from '../../hooks/useSentry'

const Component: FunctionComponent = () => {
  const { sentryWithExtras } = useSentry()

  const error = new Error('test error message')
  const feature = 'test-provider'
  useEffect(() => {
    sentryWithExtras(feature, error)
  }, [feature, error, sentryWithExtras])

  return <div data-testid="provider"></div>
}

describe('MockSentryContextProvider', () => {
  test('sentryWithExtras', async () => {
    const sentryError = {
      count: 0,
      feature: '',
      error: new Error(),
    }
    render(
      <MockSentryContextProvider
        sentryWithExtras={(feature: string, error: Error, extras?: unknown) => {
          sentryError.count = sentryError.count + 1
          sentryError.feature = feature
          sentryError.error = error
        }}
      >
        <Component />
      </MockSentryContextProvider>
    )

    expect(screen.getByTestId('provider')).toBeInTheDocument()
    expect(sentryError).toEqual({
      count: 1,
      feature: 'test-provider',
      error: new Error('test error message'),
    })
  })
})

describe('SentryContextProvider', () => {
  test('sentryWithExtras', async () => {
    render(
      <SentryContextProvider>
        <Component />
      </SentryContextProvider>
    )

    expect(screen.getByTestId('provider')).toBeInTheDocument()
  })
})
