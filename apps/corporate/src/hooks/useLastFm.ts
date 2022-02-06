import { useContext } from 'react'
import { LastFmContext } from '../providers/lastFm'

export const useLastFm = () => useContext(LastFmContext)
