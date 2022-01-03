import { HeaderInit } from 'node-fetch'
import {
  homeSchema,
  aboutSchema,
  contactSchema,
  impressumSchema,
  appSchema,
  pageSchema,
} from '../schemas'

import { getFile } from './lib'

/*
 * Fetch data from GitLab
 *  GET /projects/:id/repository/files/:file_path
 *  see: https://docs.gitlab.com/ee/api/repository_files.html
 */

const filePaths = [
  { path: 'data/app.json', schema: appSchema },
  { path: 'data/page.json', schema: pageSchema },
  { path: 'data/home.json', schema: homeSchema },
  { path: 'data/about.json', schema: aboutSchema },
  { path: 'data/contact.json', schema: contactSchema },
  { path: 'data/impressum.json', schema: impressumSchema },
]

const token = process.env.GITLAB_API_BEARER_TOKEN

const headers: HeaderInit = {
  Accept: 'text/plain; charset=utf-8',
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + token,
}

filePaths.forEach(({ path, schema }) => getFile(path, schema, headers))
