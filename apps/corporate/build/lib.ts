import fetch, { Response, HeaderInit } from 'node-fetch'
import fs from 'fs'
import Ajv, { AnySchema } from 'ajv'
import { targetPath, FilePath } from './config'

const ajv = new Ajv()

export const getDir = (path: string): string =>
  path.split('/').slice(0, -1).join('/')

function checkDir(path: string): void {
  const dir = getDir(path)
  if (!fs.existsSync(`${targetPath}/${dir}`)) {
    fs.mkdirSync(`${targetPath}/${dir}`, { recursive: true })
  }
}

function writeFile(path: string, data: string): void {
  checkDir(path)

  fs.writeFile(`${targetPath}/${path}`, data, err => {
    if (err) {
      throw err
    }
    console.log(`File: ${path} written`)
  })
}

function createWriteStream(path: string, res: Response): void {
  checkDir(path)
  res.body.pipe(fs.createWriteStream(`${targetPath}/${path}`))
  console.log(`File: ${path} written`)
}

type CreateFileArgs =
  | { path: string; data: string }
  | { path: string; res: Response }

export function createFile(args: CreateFileArgs): void {
  if ('path' in args && 'res' in args) {
    const { path, res } = args
    createWriteStream(path, res)
  } else {
    const { path, data } = args
    writeFile(path, data)
  }
}

export function validateFile(schema: AnySchema, data: string, path: string) {
  const validate = ajv.compile(schema)
  if (validate(JSON.parse(data))) {
    console.log(`File: ${path} validated`)
  } else {
    const error = `File: ${path} failed validation`
    console.error(error)
    throw new Error(error)
  }
}

export function getFile(path: string, headers: HeaderInit, schema?: AnySchema) {
  const url = `${
    process.env.GITLAB_PROJECT_URL
  }/repository/files/${encodeURIComponent(path)}/raw`

  fetch(url, {
    method: 'GET',
    headers,
  })
    .then(res => {
      console.log(`File: ${path} fetched`)

      if (schema) {
        return res.text()
      } else {
        createFile({ path, res })
        return null
      }
    })
    .then(data => {
      if (data === null) return
      if (schema) {
        validateFile(schema, data, path)
        createFile({ path, data })
      }
    })
}

type RepositoryTreeItem = {
  id: string
  name: string
  path: string
  mode: string
}

async function getRepositoryTree(
  headers: HeaderInit,
  recursive = true
): Promise<RepositoryTreeItem[]> {
  const url = `${process.env.GITLAB_PROJECT_URL}/repository/tree/?recursive=${recursive}`
  return await fetch(url, {
    method: 'GET',
    headers,
  })
    .then(res => res.json())
    .then(data => data)
}

export function getContent(filePaths: FilePath[], header: HeaderInit): void {
  filePaths.forEach(({ path, schema }) => getFile(path, header, schema))
}

export async function getFiles(header: HeaderInit): Promise<void> {
  const tree = await getRepositoryTree(header)
  const files = tree.filter(
    // filter only files and no directories
    ({ mode, path }) => mode === '100644' && path.startsWith('files/')
  )
  files.forEach(({ path }) => getFile(path, header))
}
