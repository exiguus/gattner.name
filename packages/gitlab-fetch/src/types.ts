import { Response } from 'node-fetch'

export type RepositoryTreeItem = {
  id: string
  name: string
  path: string
  mode: string
}

export type ValidateFunction = (data: unknown) => boolean

export type FilePath = {
  path: string
  validate?: (schema: unknown) => boolean
}

export type CreateFileArgs =
  | { path: string; data: string }
  | { path: string; res: Response }
