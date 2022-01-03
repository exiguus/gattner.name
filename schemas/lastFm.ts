import { JSONSchemaType } from 'ajv'

/*
 * LastFM Recenttracks JSON API
 *  https://www.last.fm/api/show/user.getRecentTracks
 */

export type Artist = {
  '#text': string
}

export const artistSchema: JSONSchemaType<Artist> = {
  type: 'object',
  properties: {
    '#text': { type: 'string' },
  },
  required: ['#text'],
  additionalProperties: true,
}

export type Track = {
  artist: Artist
  name: string
}

export const trackSchema: JSONSchemaType<Track> = {
  type: 'object',
  properties: {
    artist: artistSchema,
    name: { type: 'string' },
  },
  required: ['artist', 'name'],
  additionalProperties: true,
}

export type Recenttracks = {
  track: Track[]
}

export const recenttracksSchema: JSONSchemaType<Recenttracks> = {
  type: 'object',
  properties: {
    track: {
      type: 'array',
      items: trackSchema,
    },
  },
  required: ['track'],
  additionalProperties: true,
}

export type UserRecenttracks = {
  recenttracks: Recenttracks
}

export const userRecenttracksSchema: JSONSchemaType<UserRecenttracks> = {
  type: 'object',
  properties: {
    recenttracks: recenttracksSchema,
  },
  required: ['recenttracks'],
  additionalProperties: true,
}
