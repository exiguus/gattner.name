import fetch, { HeaderInit } from 'node-fetch'
import fs from 'fs'
import Ajv, { AnySchema } from 'ajv'

const ajv = new Ajv()

export const getDir = (path: string): string =>
  path.split('/').slice(0, -1).join('/')

export function createFile(path: string, data: string) {
  const dir = getDir(path)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFile(path, data, err => {
    if (err) {
      throw err
    }
    console.log(`File: ${path} written`)
  })
}

export function getFile(
  path: string,
  schema: AnySchema,
  headers: HeaderInit | undefined
) {
  const url = `${
    process.env.GITLAB_PROJECT_URL
  }/repository/files/${encodeURIComponent(path)}/raw`

  fetch(url, {
    method: 'GET',
    headers: headers,
  })
    .then(res => res.text())
    .then(data => {
      console.log(`File: ${path} fetched`)
      const validate = ajv.compile(schema)
      if (validate(JSON.parse(data))) {
        console.log(`File: ${path} validated`)
        createFile(path, data)
      } else {
        const error = `File: ${path} failed validation`
        console.error(error)
        throw new Error(error)
      }
    })
}
