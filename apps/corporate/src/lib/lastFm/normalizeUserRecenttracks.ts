import { UserRecenttracks } from 'schemas/lastFm'

export type UserRecenttrack = string

export const normalizeUserRecenttracks = (
  userRecenttracks: UserRecenttracks
): UserRecenttrack => {
  const artistName = userRecenttracks.recenttracks.track[0].artist['#text']
  const songName = userRecenttracks.recenttracks.track[0].name
  return `${artistName} - ${songName}`
}
