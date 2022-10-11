import { expect, describe, test } from '@jest/globals'
import GitLabApi from '../src'
import { token, projectId, targetPath } from './helper'

export const sourcePath = 'assets/'

describe('gitlab api assets', () => {
  test('client throw unauthorized error', async () => {
    const client = new GitLabApi('token', 'projectId')

    await expect(
      async () =>
        await client.assets({
          action: 'save',
          targetPath,
          sourcePath: 'unauthorized/',
        })
    ).rejects.toThrow(
      '[@gattner/gitlab-fetch]: `unauthorized/` failed to fetch. Status: 401 - Unauthorized from (Client)'
    )
  })

  test('save content', async () => {
    const client = new GitLabApi(token, projectId)
    const fetchAssets = async () =>
      await client.assets({ action: 'save', targetPath, sourcePath })
    const fetched = fetchAssets()
      .then(() => true)
      .catch(() => false)
      .finally(() => false)

    await expect(await fetched).toBe(true)
  })

  test('save content throw not found error', async () => {
    const client = new GitLabApi(token, projectId)

    await expect(
      async () =>
        await client.assets({
          action: 'save',
          targetPath,
          sourcePath: 'notfound/',
        })
    ).rejects.toThrow(
      '[@gattner/gitlab-fetch]: `sourcePath` is empty. No Assets files to save from (Client)'
    )
  })
})
