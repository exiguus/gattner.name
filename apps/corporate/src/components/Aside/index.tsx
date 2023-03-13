import React, { useEffect, useState } from 'react'
import useNetwork from '../../hooks/useNetwork'
import { isPrerender } from '../../utils/prerender'
import { LastFm } from '../LastFm'

export const Aside = () => {
  const [showLastFm, setShowLastFm] = useState<boolean>(false)
  const { online, connection } = useNetwork()
  const hasConnection =
    connection.effectiveType !== 'slow-2g' &&
    connection.effectiveType !== '2g' &&
    online &&
    !isPrerender()

  useEffect(() => {
    if (hasConnection) {
      setShowLastFm(true)
      import('../../lib/tracker').then(({ track }) => {
        track({
          type: 'animate',
          msg: 'LastFm animated',
          value: `LastFm animated with connection "${connection.effectiveType}"`,
        })
      })
    }
  }, [connection.effectiveType, hasConnection])
  return showLastFm ? (
    <aside>
      <LastFm />
    </aside>
  ) : null
}
