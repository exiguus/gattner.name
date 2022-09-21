import { expect, describe, test } from '@jest/globals'
import Ajv from 'ajv'
import GitLabApi from '../src'
import { FilePath } from '../src'
import { token, projectId, targetPath } from './helper'
import { appSchema } from './helper/schema'

const ajv = new Ajv()
const filePath = { path: 'content/app.json', validate: ajv.compile(appSchema) }
export const filePaths: FilePath[] = [filePath]

describe('gitlab api data', () => {
  test('client throw unauthorized error', async () => {
    const client = new GitLabApi('token', 'projectId')

    await expect(
      async () =>
        await client.data({
          action: 'save',
          targetPath,
          filePaths: [{ ...filePath, path: 'content/unauthorized.json' }],
        })
    ).rejects.toThrow(
      '[@gattner/gitlab-fetch]: `content/unauthorized.json` failed to fetch. Status: 401 - Unauthorized from (Client)'
    )
  })

  test('save content', async () => {
    const client = new GitLabApi(token, projectId)
    const fetchData = async () =>
      await client.data({ action: 'save', targetPath, filePaths })
    const fetched = fetchData()
      .then(() => true)
      .catch(() => false)
      .finally(() => false)

    await expect(await fetched).toBe(true)
  })

  test('save content throw not found error', async () => {
    const client = new GitLabApi(token, projectId)

    await expect(
      async () =>
        await client.data({
          action: 'save',
          targetPath,
          filePaths: [{ ...filePath, path: 'content/notfound.json' }],
        })
    ).rejects.toThrow(
      '[@gattner/gitlab-fetch]: `content/notfound.json` failed to fetch. Status: 404 - Not Found from (Client)'
    )
  })
})
