import { getFile } from './lib.mjs'
/*
 * Fetch data from GitLab
 *  GET /projects/:id/repository/files/:file_path
 *  see: https://docs.gitlab.com/ee/api/repository_files.html
 */

const filePaths = [
  'data/about.json',
  'data/contact.json',
  'data/impressum.json',
  'data/home.json',
  'data/site.json',
]

const token = process.env.GITLAB_API_BEARER_TOKEN

const headers = {
  Accept: 'text/plain; charset=utf-8',
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + token,
}

filePaths.forEach(filePath => getFile(filePath, headers))
