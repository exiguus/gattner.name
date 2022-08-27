import {
  targetPath,
  sourcePath,
  projectId,
  token,
  contentFilePaths,
} from './config'
import GitLabApi from '@gattner/gitlab-fetch'

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
  await Promise.all([
    await client.assets({ targetPath, sourcePath, action: 'save' }),
    await client.data({
      targetPath,
      filePaths: contentFilePaths,
      action: 'save',
    }),
  ])
}

fetchData()
