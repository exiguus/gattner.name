import * as v from '@badrap/valita'

export type StaticAppend = {
  fingerprint: number
  pid: number
  name: string
}

export const staticAppendSchema = v.object({
  fingerprint: v.number(),
  pid: v.number(),
  name: v.string(),
})
