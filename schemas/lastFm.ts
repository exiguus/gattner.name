import * as v from '@badrap/valita'

/*
 * LastFM Recenttracks JSON API
 *  https://www.last.fm/api/show/user.getRecentTracks
 */

export type Artist = {
  '#text': string
}

export const artistSchema = v.object({
  '#text': v.string(),
  mbid: v.string(),
})

export type Track = {
  artist: Artist
  name: string
}

export const trackSchema = v.object({
  '@attr': v.record(v.string()).optional(),
  album: v.record(v.string()),
  artist: artistSchema,
  date: v.record(v.string()).optional(),
  image: v.array(v.record(v.string())),
  mbid: v.string(),
  name: v.string(),
  streamable: v.string(),
  url: v.string(),
})

export type Recenttracks = {
  track: Track[]
}

export const recenttracksSchema = v.object({
  track: v.array(trackSchema),
  '@attr': v.record(v.string()),
})

export const userRecenttracksSchema = v.object({
  recenttracks: recenttracksSchema,
})

export type UserRecenttracks = {
  recenttracks: Recenttracks
}

export const validate = <T>(schema: v.Type, data: unknown): T | undefined => {
  try {
    const result = schema.parse(data)
    return result as T
  } catch (err) {
    console.warn(err instanceof Error ? err.message : err, {
      err,
      data,
      schema,
    })
    if (err instanceof Error) {
      throw err
    }
  }
}
