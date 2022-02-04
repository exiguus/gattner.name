import React, { FunctionComponent } from 'react'
import { render, screen, waitFor } from '../../../test/testUtils'
import { LastFmContextProvider, MockLastFmContextProvider } from '.'
import { useLastFm } from '../../hooks/useLastFm'
import { server } from '../../../mocks/server'
import { lastFmExceptionHandler } from '../../../mocks/handlers'

const Component: FunctionComponent = () => {
  const { isPending, hasUserRecenttrack, userRecenttrack } = useLastFm()

  return (
    <div data-testid="provider">
      <span data-testid="isPending">{isPending.toString()}</span>
      <span data-testid="hasUserRecenttrack">
        {hasUserRecenttrack.toString()}
      </span>
      <span data-testid="userRecenttrack">{userRecenttrack}</span>
    </div>
  )
}

describe('LastFmContextProvider Exceptions', () => {
  test('defaultProps Exception', async () => {
    server.use(lastFmExceptionHandler)
    render(
      <LastFmContextProvider>
        <Component />
      </LastFmContextProvider>
    )

    expect(screen.getByTestId('provider')).toBeInTheDocument()

    await waitFor(() => {
      const isPendingElement = screen.getByTestId('isPending')
      expect(isPendingElement).toBeInTheDocument()
      expect(isPendingElement.textContent).toEqual('false')
    })

    await waitFor(() => {
      const hasUserRecenttrackElement = screen.getByTestId('hasUserRecenttrack')
      expect(hasUserRecenttrackElement).toBeInTheDocument()
      expect(hasUserRecenttrackElement.textContent).toEqual('true')
    })

    await waitFor(() => {
      const userRecenttrackElement = screen.getByTestId('userRecenttrack')
      expect(userRecenttrackElement).toBeInTheDocument()
      expect(userRecenttrackElement.textContent).toEqual(
        'Muse - Butterflies and Hurricanes'
      )
    })
  })
})

describe('LastFmContextProvider', () => {
  test('defaultProps', async () => {
    render(
      <LastFmContextProvider>
        <Component />
      </LastFmContextProvider>
    )

    expect(screen.getByTestId('provider')).toBeInTheDocument()

    await waitFor(() => {
      const isPendingElement = screen.getByTestId('isPending')
      expect(isPendingElement).toBeInTheDocument()
      expect(isPendingElement.textContent).toEqual('false')
    })

    await waitFor(() => {
      const hasUserRecenttrackElement = screen.getByTestId('hasUserRecenttrack')
      expect(hasUserRecenttrackElement).toBeInTheDocument()
      expect(hasUserRecenttrackElement.textContent).toEqual('true')
    })

    await waitFor(() => {
      const userRecenttrackElement = screen.getByTestId('userRecenttrack')
      expect(userRecenttrackElement).toBeInTheDocument()
      expect(userRecenttrackElement.textContent).toEqual('Milliarden - Marie')
    })
  })
})

describe('MockLastFmContextProvider', () => {
  test('defaultProps', async () => {
    render(
      <MockLastFmContextProvider>
        <Component />
      </MockLastFmContextProvider>
    )

    expect(screen.getByTestId('provider')).toBeInTheDocument()

    await waitFor(() => {
      const isPendingElement = screen.getByTestId('isPending')
      expect(isPendingElement).toBeInTheDocument()
      expect(isPendingElement.textContent).toEqual('true')
    })

    await waitFor(() => {
      const hasUserRecenttrackElement = screen.getByTestId('hasUserRecenttrack')
      expect(hasUserRecenttrackElement).toBeInTheDocument()
      expect(hasUserRecenttrackElement.textContent).toEqual('false')
    })

    await waitFor(() => {
      const userRecenttrackElement = screen.getByTestId('userRecenttrack')
      expect(userRecenttrackElement).toBeInTheDocument()
      expect(userRecenttrackElement.textContent).toEqual('')
    })
  })

  test('hasUserRecenttrack', async () => {
    render(
      <MockLastFmContextProvider
        isPending={false}
        hasUserRecenttrack={true}
        userRecenttrack="Born Slippy .NUXX - Underworld"
      >
        <Component />
      </MockLastFmContextProvider>
    )

    expect(screen.getByTestId('provider')).toBeInTheDocument()

    await waitFor(() => {
      const isPendingElement = screen.getByTestId('isPending')
      expect(isPendingElement).toBeInTheDocument()
      expect(isPendingElement.textContent).toEqual('false')
    })

    await waitFor(() => {
      const hasUserRecenttrackElement = screen.getByTestId('hasUserRecenttrack')
      expect(hasUserRecenttrackElement).toBeInTheDocument()
      expect(hasUserRecenttrackElement.textContent).toEqual('true')
    })

    await waitFor(() => {
      const userRecenttrackElement = screen.getByTestId('userRecenttrack')
      expect(userRecenttrackElement).toBeInTheDocument()
      expect(userRecenttrackElement.textContent).toEqual(
        'Born Slippy .NUXX - Underworld'
      )
    })
  })
})
