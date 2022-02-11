import fetch, { Response, HeaderInit } from 'node-fetch'
import { existsSync, mkdirSync, writeFile, createWriteStream } from 'fs'

const GITLAB_PROJECT_URL = 'https://gitlab.com/api/v4/projects/'
const GITLAB_FILE_MODE = '100644'

export { Response, HeaderInit }

export type FilePath = {
  path: string
  validate: (schema: unknown) => boolean
}

export const getDir = (path: string): string =>
  path.split('/').slice(0, -1).join('/')

function checkDir(targetPath: string, path: string): void {
  const dir = getDir(path)
  if (!existsSync(`${targetPath}/${dir}`)) {
    mkdirSync(`${targetPath}/${dir}`, { recursive: true })
  }
}

function myWriteFile(targetPath: string, path: string, data: string): void {
  checkDir(targetPath, path)

  writeFile(`${targetPath}/${path}`, data, error => {
    if (error) {
      throw error
    }
    console.log(`File: ${path} written`)
  })
}

function myCreateWriteStream(
  targetPath: string,
  path: string,
  res: Response
): void {
  checkDir(targetPath, path)
  res.body.pipe(createWriteStream(`${targetPath}/${path}`))
  console.log(`File: ${path} written`)
}

export type CreateFileArgs =
  | { path: string; data: string }
  | { path: string; res: Response }

export function createFile(targetPath: string, args: CreateFileArgs): void {
  if ('path' in args && 'res' in args) {
    const { path, res } = args
    myCreateWriteStream(targetPath, path, res)
  } else {
    const { path, data } = args
    myWriteFile(targetPath, path, data)
  }
}

export type ValidateFunction = (data: unknown) => boolean

export function validateFile(
  validate: ValidateFunction,
  data: string,
  path: string
) {
  if (validate(JSON.parse(data))) {
    console.log(`File: ${path} validated`)
  } else {
    const error = `File: ${path} failed validation`
    console.error(error)
    throw new Error(error)
  }
}

export function getFile(
  targetPath: string,
  path: string,
  headers: HeaderInit,
  projectId: string,
  validate?: ValidateFunction
) {
  const url = `${
    GITLAB_PROJECT_URL + projectId
  }/repository/files/${encodeURIComponent(path)}/raw`

  fetch(url, {
    method: 'GET',
    headers,
  })
    .then(res => {
      console.log(`File: ${path} fetched`)

      if (validate) {
        return res.text()
      } else {
        createFile(targetPath, { path, res })
        return null
      }
    })
    .then(data => {
      if (data === null) return
      if (validate) {
        validateFile(validate, data, path)
        createFile(targetPath, { path, data })
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
  projectId: string,
  recursive = true
): Promise<RepositoryTreeItem[]> {
  const url = `${
    GITLAB_PROJECT_URL + projectId
  }/repository/tree/?recursive=${recursive}`
  return await fetch(url, {
    method: 'GET',
    headers,
  })
    .then(res => res.json())
    .then(data => data)
}

export const getHeader = (token: string): HeaderInit => ({
  Accept: 'text/plain; charset=utf-8',
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + token,
})

/**
 * Get content from GitLab.
 *  Fetch, validate and save JSON files.
 * @param targetPath {string} target path to save content in
 * @param filePaths {FilePath[]} array of objects containing file path and validate function of the content
 * @param token {string} bearer token send with the request header to authenticate
 * @param projectId {string} GitLab project ID
 */
export function getContent(
  targetPath: string,
  filePaths: FilePath[],
  token: string,
  projectId: string
): void {
  const header = getHeader(token)
  filePaths.forEach(({ path, validate }) =>
    getFile(targetPath, path, header, projectId, validate)
  )
}

/**
 * Get files from GitLab.
 *  Fetch and save any file.
 * @param targetPath {string} target path to save files in
 * @param sourcePath {string} source path to fetch files from
 * @param token {string} bearer token send with the request header to authenticate
 * @param projectId {string} GitLab project ID
 */
export async function getFiles(
  targetPath: string,
  sourcePath: string,
  token: string,
  projectId: string
): Promise<void> {
  const header = getHeader(token)
  const tree = await getRepositoryTree(header, projectId)
  const files = tree.filter(
    // filter only files and no directories within the sourcePath
    ({ mode, path }) => mode === GITLAB_FILE_MODE && path.startsWith(sourcePath)
  )
  files.forEach(({ path }) => getFile(targetPath, path, header, projectId))
}
