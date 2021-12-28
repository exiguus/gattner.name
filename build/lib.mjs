import fetch from 'node-fetch'
import fs from 'fs'

export const getDir = filePath => filePath.split('/').slice(0, -1).join('/')

export function createFile(filePath, data) {
  const dir = getDir(filePath)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFile(filePath, data, err => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`File: ${filePath} written \n`)
  })
}

export function getFile(filePath, headers) {
  const url = `${
    process.env.GITLAB_PROJECT_URL
  }/repository/files/${encodeURIComponent(filePath)}/raw`

  fetch(url, {
    method: 'GET',
    headers: headers,
  })
    .then(res => res.text())
    .then(data => {
      console.log(`File: ${filePath} fetched \n`)
      createFile(filePath, data)
    })
}
