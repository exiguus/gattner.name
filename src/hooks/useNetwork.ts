import { useState, useEffect } from 'react'

// Network Information API
// NetworkInfo https://wicg.github.io/netinfo/
// https://caniuse.com/netinfo

enum ConnectionType {
  'bluetooth',
  'cellular',
  'ethernet',
  'mixed',
  'none',
  'other',
  'unknown',
  'wifi',
}

enum EffectiveConnectionType {
  '2g',
  '3g',
  '4g',
  'slow-2g',
}

type NetworkInformation = {
  readonly type: keyof typeof ConnectionType
  readonly effectiveType: keyof typeof EffectiveConnectionType
  readonly saveData: boolean
  readonly downlink: number
  readonly downlinkMax?: number
  readonly rtt: number
  onchange: Function | null
}

interface NavigatorConnection extends Navigator {
  readonly connection: NetworkInformation & EventTarget
}

type NetworkTypes = {
  online: boolean
  connection: NetworkInformation
}

function useNetwork(): NetworkTypes {
  const connectionLegacy: NetworkInformation = {
    type: 'unknown',
    effectiveType: '4g',
    saveData: false,
    downlink: 3.45,
    downlinkMax: 3.5,
    rtt: 50,
    onchange: null,
  }
  const [network, setNetwork] = useState({
    online: window.navigator.onLine || true,
    connection:
      (window.navigator as NavigatorConnection).connection || connectionLegacy,
  })
  const updateNetwork = (): void => {
    setNetwork({
      online: window.navigator.onLine || true,
      connection:
        (window.navigator as NavigatorConnection).connection ||
        connectionLegacy,
    })
  }
  useEffect(() => {
    const navigator = window.navigator as NavigatorConnection
    navigator.connection?.addEventListener('change', updateNetwork)
    window.addEventListener('offline', updateNetwork)
    window.addEventListener('online', updateNetwork)
    return (): void => {
      navigator.connection?.removeEventListener('change', updateNetwork)
      window.removeEventListener('offline', updateNetwork)
      window.removeEventListener('online', updateNetwork)
    }
  })
  return network
}

export default useNetwork
