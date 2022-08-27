import GitLabApi from '.'
import { FilePath } from '.'
import Ajv from 'ajv'

import {
  // homeSchema,
  // aboutSchema,
  // contactSchema,
  // impressumSchema,
  appSchema,
  // pageSchema,
  // errorSchema,
} from '../../../apps/corporate/schemas'
import { GITLAB_PROJECT_ID } from '../mocks/handlers'

const ajv = new Ajv()

export const filePaths: FilePath[] = [
  { path: 'content/app.json', validate: ajv.compile(appSchema) },
  // { path: 'content/page.json', validate: ajv.compile(pageSchema) },
  // { path: 'content/error.json', validate: ajv.compile(errorSchema) },
  // { path: 'content/home.json', validate: ajv.compile(homeSchema) },
  // { path: 'content/about.json', validate: ajv.compile(aboutSchema) },
  // { path: 'content/contact.json', validate: ajv.compile(contactSchema) },
  // { path: 'content/impressum.json', validate: ajv.compile(impressumSchema) },
]

export const token = 'x-xxx'
export const targetPath = './data'
export const sourcePath = 'assets/'
export const projectId = GITLAB_PROJECT_ID

/*
 * Fetch files and content
 *  from GitLab and store it in {sourcePath}
 */

async function fetchData() {
  if (!token) {
    throw new Error('Fetch data: GitLab token is missing')
  }

  if (!projectId) {
    throw new Error('Fetch data: GitLab project ID is missing')
  }

  const client = new GitLabApi(token, projectId)
  await client.data({ action: 'save', targetPath, filePaths })
  // await Promise.all([
  // await client.assets({ action: 'save', targetPath, sourcePath }),
  // ])
}

describe('gitlab api', () => {
  test('save content', async () => {
    const fetched = await new Promise(r =>
      fetchData()
        .then(() => {
          r(true)
          return true
        })
        .finally(() => false)
    )
    await expect(await fetched).toBe(true)
  })
})
